import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../../entities/Subscription.entity';
import { Users } from 'src/entities/User.entity';
import { SubscriptionDto } from 'src/dtos/subscription.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';

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
  ) {
    this.client = new MercadoPagoConfig({
      accessToken: 'TEST-8579480717945015-060511-c10487fc986c430016b3b663064f7104-1845423782',
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


  async createSubscription(userId: string, subscriptionDto: SubscriptionDto) {
    try {
      const user = await this.usersRepository.findOne({ where: { id: userId } });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const dateInit = new Date();
      const dateFin = new Date(dateInit.getTime());
      dateFin.setDate(dateFin.getDate() + 30);
  
      const subscription = this.subscriptionRepository.create({
        ...subscriptionDto,
        user,
        dateFin,
        dateInit
      });
  
      const preferenceData = {
        items: [
          {
            id: '1',
            type: subscriptionDto.type,
            status: subscriptionDto.status,
            title: 'Subscription', // Valor por defecto
            quantity: 1, // Valor por defecto
            unit_price: subscriptionDto.amount,
          },
        ],
        back_urls: {
          success: 'http://localhost:3001/',
        },
      };
  
      const preferenceResponse = await this.preference.create({
        body: preferenceData,
      });
  
      await this.subscriptionRepository.save(subscription);
      user.subscription = subscription;
      await this.usersRepository.save(user);
  
      return preferenceResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async updateSubscriptionType(id: string, type: string, status: string) {
    // Convertir el status a minúsculas para comparación
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

  async paymentSuccess() {
    return 'success';
  }
}
