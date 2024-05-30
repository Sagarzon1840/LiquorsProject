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
import { GlobalExceptionFilter } from './interceptors/globalExceptions.interceptor';
import { Product } from './entities/Product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    // ProductModule,
    UserModule,
    ReviewsModule,
    SubscriptionModule,
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
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
  ],
})
export class AppModule {}
