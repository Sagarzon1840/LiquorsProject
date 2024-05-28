import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
