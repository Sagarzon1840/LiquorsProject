import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import typeOrm from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { SubscriptionModule } from './modules/subscription/subcription.module';
import { JwtModule } from '@nestjs/jwt';
import { QueryFailedExceptionFilter } from './interceptors/globalExceptions.interceptor';
import { Product } from './entities/Product.entity';
import { ProductModule } from './modules/product/product.module';
import { Users } from './entities/User.entity';
import { PayPalModule } from './modules/paypal/paypal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Users]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    ProductModule,
    UserModule,
    ReviewsModule,
    SubscriptionModule,
    PayPalModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    { provide: APP_FILTER, useClass: QueryFailedExceptionFilter },
  ],
})
export class AppModule {}
