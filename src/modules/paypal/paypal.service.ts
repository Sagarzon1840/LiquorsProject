import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { SubscriptionDto } from 'src/dtos/subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from 'src/entities/Subscription.entity';
import { Users } from 'src/entities/User.entity';
import { TempStorage } from 'src/entities/tempStorage';
import { URLSearchParams } from 'url';
import { UserRole } from 'src/enums/roles.enum';

@Injectable()
export class PayPalService {
    private readonly PAYPAL_API_CLIENT = 'AQHzAelIrBA_4-9s_xXSYlEjyyi3DnlAHsSMDiz4jgIFeeACFNBPjTf7TwYraOk_Rop1MRDkyI5OMdYJ';
    private readonly PAYPAL_API_SECRET = 'EJPHRWGJfHCSjd-T2iP5he0_09S-hLmsTI8z8H4_4gpzLAPrYZ0kdziolNz04wLDHTyZfFsOBjHgYO4h';
    private readonly PAYPAL_API = 'https://api-m.sandbox.paypal.com';

    constructor(
        @InjectRepository(Subscription)
        private subscriptionRepository: Repository<Subscription>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(TempStorage)
        private tempStorageRepository: Repository<TempStorage>
    ) {}

    async createOrder(subscriptionDto: SubscriptionDto, userId: string) {
        try {
            const order = {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: subscriptionDto.amount
                    }
                }],
                application_context: {
                    brand_name: 'Liqours',
                    landing_page: 'NO_PREFERENCE',
                    user_action: 'PAY_NOW',
                    return_url: `https://front-deploy-sage.vercel.app/`,
                    cancel_url: `https://front-deploy-sage.vercel.app/`
                }
            };

            const params = new URLSearchParams();
            params.append('grant_type', 'client_credentials');

            const { data: { access_token } } = await axios.post(`${this.PAYPAL_API}/v1/oauth2/token`, params, {
                auth: {
                    username: this.PAYPAL_API_CLIENT,
                    password: this.PAYPAL_API_SECRET
                }
            });

            const response = await axios.post(`${this.PAYPAL_API}/v2/checkout/orders`, order, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Guardar los detalles en TempStorage
            const tempData = this.tempStorageRepository.create({
                userId: userId,
                orderId: response.data.id, // Agregar el orderId para encontrarlo luego en captureOrder
                type: subscriptionDto.type,
                amount: subscriptionDto.amount,
                amountDif: subscriptionDto.amountDif
            });
            await this.tempStorageRepository.save(tempData);

            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(`Failed to create order: ${error.response.data.message}`);
            } else {
                throw new Error(`Failed to create order: ${error.message}`);
            }
        }
    }

    async captureOrder(token: string) {
        try {
            const { data: { access_token } } = await axios.post(`${this.PAYPAL_API}/v1/oauth2/token`, new URLSearchParams({
                grant_type: 'client_credentials'
            }), {
                auth: {
                    username: this.PAYPAL_API_CLIENT,
                    password: this.PAYPAL_API_SECRET
                }
            });

            const response = await axios.post(`${this.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            });

            const captureData = response.data;

            // Procesar la captura y actualizar la suscripción
            if (captureData.status === 'COMPLETED') {
                await this.handlePaymentSuccess(captureData.id);
            }

            return captureData;
        } catch (error) {
            if (error.response) {
                throw new Error(`Failed to capture order: ${error.response.data.message}`);
            } else {
                throw new Error(`Failed to capture order: ${error.message}`);
            }
        }
    }

    async handlePaymentSuccess(orderId: string) {
        try {
            const tempData = await this.tempStorageRepository.findOne({ where: { orderId: orderId } });
            if (!tempData) {
                throw new NotFoundException('Temp data not found');
            }

            const user = await this.usersRepository.findOne({ where: { id: tempData.userId }, relations: ['subscription'] });
            if (!user) {
                throw new NotFoundException('User not found');
            }

            let subscription = user.subscription;

            if (subscription && subscription.type === 'premium' && tempData.type === 'seller') {
                if (tempData.amount < tempData.amountDif) {
                    throw new BadRequestException('Insufficient amount for subscription upgrade');
                }

                subscription.type = 'seller';
                subscription.amount = tempData.amount;
                subscription.status = 'active';

                await this.subscriptionRepository.save(subscription);

                user.role = UserRole.Seller;
                await this.usersRepository.save(user);
            } else {
                const dateInit = new Date();
                const dateFin = new Date(dateInit.getTime());
                dateFin.setDate(dateFin.getDate() + 30);

                subscription = this.subscriptionRepository.create({
                    amount: tempData.amount,
                    type: tempData.type,
                    user,
                    dateFin,
                    dateInit,
                    status: 'active',
                });

                await this.subscriptionRepository.save(subscription);
                user.subscription = subscription;

                switch (subscription.type) {
                    case "premium":
                        user.role = UserRole.Premium;
                        break;
                    case "seller":
                        user.role = UserRole.Seller;
                        break;
                }
                await this.usersRepository.update(user.id, user);
                await this.usersRepository.save(user);
            }

            await this.tempStorageRepository.delete({ id: tempData.id });
        } catch (error) {
            throw error;
        }
    }

    cancelOrder() {
        // Manejo de cancelación de la orden si es necesario
        return { message: 'Order cancelled' };
    }
}
