import { BadRequestException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../../entities/Subscription.entity';
import { Users } from 'src/entities/User.entity';
import { SubscriptionDto } from 'src/dtos/subscription.dto';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { SubDto } from 'src/dtos/sub.dto';
import { PaymentSearchData } from 'mercadopago/dist/clients/payment/search/types';
import { UserRole } from 'src/enums/roles.enum';
import { v4 as uuidv4 } from 'uuid';
import { title } from 'process';
import { TempStorage } from 'src/entities/tempStorage';
// import * as mercadopago from 'mercadopago';

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
      accessToken: 'TEST-720609286863999-060501-d1863148fd64d41481d5501518cd9b73-1842406931', // Reemplaza con tu access token real
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
      const user = await this.usersRepository.findOne({ where: { id: userId } });
  
      if (!user) {
        throw new Error('User not found');
      }
      const validUser = await this.subscriptionRepository.findOne({
        where: { user },
      });
      if (validUser) {
        throw new BadRequestException('User already has a subscription');
      }
      const preferenceData = {
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
          success: 'http://localhost:3000/login',
          failure: 'http://localhost:3000/login'
        },
        auto_return: 'approved',
        // para local
        // notification_url: "https://4398-2803-9800-b8ca-80aa-704a-cf83-a988-f7be.ngrok-free.app/subscription"
         notification_url: "https://liquors-project.onrender.com/subscription"
      };
  
      const preferenceResponse = await this.preference.create({
        body: preferenceData,
      });
  
      // Almacena la información temporalmente (puedes usar una base de datos o Redis)
      const tempData = new TempStorage()
      tempData.userId = userId,
      tempData.type = subscriptionDto.type
      tempData.amount = subscriptionDto.amount

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
        const response = await payment.search(dataId);
  
        if (!response || !response.results || response.results.length === 0) {
          throw new BadRequestException('Payment not found');
        }
  
        // Recupera la información temporal
        const tempData = await this.tempStorage.find();
        if (!tempData || tempData.length === 0) {
          throw new BadRequestException('Temp data not found');
        }

        if (!tempData[0].userId || !tempData[0].amount || !tempData[0].type || !tempData[0].id) {
          throw new BadRequestException('Invalid temp data');
        }

        const userId = tempData[0].userId;
        const amount = tempData[0].amount;
        const type = tempData[0].type;
        const idTemp = tempData[0].id;

        // console.log(userId);
        // console.log(amount);
        // console.log(type);
        // console.log(idTemp);
  
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
  
        const validUser = await this.subscriptionRepository.findOne({
          where: { user },
        });
        if (validUser) {
          throw new BadRequestException('User already has a subscription');
        }

        const dateInit = new Date();
        const dateFin = new Date(dateInit.getTime());
        dateFin.setDate(dateFin.getDate() + 30);
  
        const subscription = this.subscriptionRepository.create({
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
  
        // Elimina la información temporal
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