import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { SubcriptionService } from './subcription.service';
// import { SubcriptionDto } from 'src/dtos/subcription.dto';

@Controller('subcription')
export class SubcriptionController {
  constructor(private readonly subcriptionService: SubcriptionService) {}

  @Get()
  getSubcription() {
    return this.subcriptionService.getSubcription();
  }

  @Put(':id')
  updateSubcriptionType(@Body() id: string, type: string, status: string) {
    return this.subcriptionService.updateSubcriptionType(id, type, status);
  }

  @Put(':id')
  createSubcriptionType(@Body() type: string, price: number) {
    return this.subcriptionService.createSubcription(type, price);
  }

  // @Delete()
  // deleteSubcription(@Param("id", ParseUUIDPipe) id:string) {
  //   return this.subcriptionService.deleteSubcription(id);
  // }
}
