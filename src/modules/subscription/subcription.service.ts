import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../../entities/Subscription.entity';
import { Users } from 'src/entities/User.entity';
import { SubscriptionDto } from 'src/dtos/subscription.dto';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { SubDto } from 'src/dtos/sub.dto';
import { PaymentSearchData } from 'mercadopago/dist/clients/payment/search/types';
import { UserRole } from 'src/enums/roles.enum';
import { TempStorage } from 'src/entities/tempStorage';

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);
  private readonly client: MercadoPagoConfig;
  private readonly preference: Preference;

  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(TempStorage)
    private tempStorage: Repository<TempStorage>
  ) {
    this.client = new MercadoPagoConfig({
      accessToken: 'TEST-720609286863999-060501-d1863148fd64d41481d5501518cd9b73-1842406931',
      options: { timeout: 5000, idempotencyKey: 'abc' },
    });
    this.preference = new Preference(this.client);
  }

  async getSubcription() {
    return await this.subscriptionRepository.find();
  }

  async deleteSubscription(userId: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
        relations: { subscription: true },
      });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      if (!user.subscription) {
        throw new BadRequestException('User does not have a subscription');
      }
  
      const { id } = user.subscription;
      user.subscription = null;
  
      await this.usersRepository.save(user);
      await this.subscriptionRepository.delete(id);
  
      this.logger.log(`Subscription with id ${id} deleted for user ${userId}`);
      return { message: 'Subscription deleted successfully' };
    } catch (error) {
      this.logger.error(`Failed to delete subscription for user ${userId}`, error.stack);
      throw error;
    }
  }

  async createFactura(userId: string, subscriptionDto: SubscriptionDto) {
    try {
      // Verificar si ya existe una entrada en TempStorage para el usuario
      const existingTempData = await this.tempStorage.findOne({ where: { userId: userId } });
  
      if (existingTempData) {
        throw new BadRequestException('User already has a pending subscription');
      }
  
      const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['subscription'] });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      let preferenceData;
  
      if (user.subscription) {
        if (user.subscription.type === "premium" && subscriptionDto.type === "seller") {
          preferenceData = {
            items: [
              {
                id: '1',
                type: subscriptionDto.type,
                status: "inactive",
                title: 'Subscription Update',
                quantity: 1,
                unit_price: subscriptionDto.amountDif,
              },
            ],
            back_urls: {
              success: 'https://front-deploy-sage.vercel.app',
              failure: 'https://front-deploy-sage.vercel.app'
            },
            auto_return: 'approved',
            notification_url: "https://liquors-project.onrender.com/subscription"
          };
        } else {
          throw new BadRequestException('User already has a subscription of type Premium');
        }
      } else {
        preferenceData = {
          items: [
            {
              id: '1',
              type: subscriptionDto.type,
              status: "inactive",
              title: 'Subscription',
              quantity: 1,
              unit_price: subscriptionDto.amount,
            },
          ],
          back_urls: {
            success: 'https://front-deploy-sage.vercel.app',
            failure: 'https://front-deploy-sage.vercel.app'
          },
          auto_return: 'approved',
          notification_url: "https://liquors-project.onrender.com/subscription"
        };
      }
  
      const preferenceResponse = await this.preference.create({
        body: preferenceData,
      });
  
      const tempData = new TempStorage();
      tempData.userId = userId;
      tempData.type = subscriptionDto.type;
      tempData.amount = subscriptionDto.amount;
      tempData.amountDif = subscriptionDto.amountDif;
  
      await this.tempStorage.save(tempData);
  
      return preferenceResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

  async updateSubscriptionType(id: string, type: string, status: string) {
    status = status.toLowerCase();
  
    if (status === 'active' || status === 'inactive') {
      const subcription = await this.subscriptionRepository.findOne({
        where: { id },
      });
  
      if (!subcription) {
        throw new NotFoundException('Subcription not found');
      }
  
      const dateInit = new Date();
      const dateFin = new Date(dateInit.getTime());
      dateFin.setDate(dateFin.getDate() + 30);
  
      subcription.type = type;
      subcription.status = status;
      subcription.dateInit = dateInit;
      subcription.dateFin = dateFin;
  
      return await this.subscriptionRepository.save(subcription);
    } else {
      throw new BadRequestException('El status es Incorrecto');
    }
  }
  
  async handlePaymentSuccess(dataId: PaymentSearchData, type1: string) {
    if (type1 === 'payment') {
      try {
        // console.log('Payment Success - Data ID:', dataId);
        // console.log('Payment Success - Type:', type1);

        const payment = new Payment(this.client);
        const response: SubDto = await payment.search(dataId);

        if (!response || !response.results || response.results.length === 0) {
          throw new NotFoundException('Payment not found');
        }

        const tempData = await this.tempStorage.find();
        if (!tempData || tempData.length === 0) {
          throw new NotFoundException('Temp data not found');
        }

        const userId = tempData[0].userId;
        const amount = tempData[0].amount;
        const amountDif = tempData[0].amountDif;
        const type = tempData[0].type;
        const idTemp = tempData[0].id;

        if (!userId || !amount || !type || !idTemp) {
          throw new BadRequestException('Invalid temp data');
        }

        // console.log(userId);
        // console.log(amount);
        // console.log(type);
        // console.log(idTemp);

        const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['subscription'] });
        if (!user) {
          throw new NotFoundException('User not found');
        }

        let subscription = user.subscription;

        if (subscription && subscription.type === 'premium' && type === 'seller') {
          if (amount < amountDif) {
            throw new BadRequestException('Insufficient amount for subscription upgrade');
          }

          subscription.type = 'seller';
          subscription.amount = amount;
          subscription.status = 'active';

          await this.subscriptionRepository.save(subscription);

          user.role = UserRole.Seller;
          await this.usersRepository.save(user);
        } else {
          const dateInit = new Date();
          const dateFin = new Date(dateInit.getTime());
          dateFin.setDate(dateFin.getDate() + 30);

          subscription = this.subscriptionRepository.create({
            amount,
            type,
            user,
            dateFin,
            dateInit,
            status: 'active',
            });
            
            await this.subscriptionRepository.save(subscription);
            user.subscription = subscription;
        
            switch (subscription.type) {
              case "premium":
                user.role = UserRole.Premium
                break;
              case "seller":
                user.role = UserRole.Seller
                break;
            }
            await this.usersRepository.update(user.id, user)
            await this.usersRepository.save(user);
        }

        await this.tempStorage.delete({ id: idTemp });

        return { statusCode: 200 };
      } catch (error) {
        this.logger.error(`Failed to retrieve payment for ID ${dataId}`, error.stack);
        if (error.response && error.response.status === 404) {
          console.error('Error during payment success processing:', error.response.data);
        } else {
          console.error('Error during payment success processing:', error);
        }
        throw error;
      }
    } else {
      throw new BadRequestException('Invalid type');
    }
  }
}