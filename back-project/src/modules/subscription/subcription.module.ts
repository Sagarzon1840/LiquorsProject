import { Module } from '@nestjs/common';
import { SubcriptionController } from './subcription.controller';
import { SubcriptionService } from './subcription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcription } from '../../entities/Subcription.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Subcription])],
  controllers: [SubcriptionController],
  providers: [SubcriptionService],
})
export class ProductModule {}