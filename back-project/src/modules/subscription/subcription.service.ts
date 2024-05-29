import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Subcription } from 'src/entities/Subcription.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/User.entity';

@Injectable()
export class SubcriptionService {

  constructor(@InjectRepository(Subcription) private subcriptionRepository: Repository<Subcription>,
    @InjectRepository(Users) private userRepository: Repository<Users>   
) {}

  async getSubcription() {
   return await this.subcriptionRepository.find()
  }

  async deleteSubcription(userId: string ) {
    const user: Users = this.userRepository.findOne({where:{id:userId},
    relations:{ subcription: true }})
    const {id} = user.subcription;
    user.supcription = null
    await this.userRepository.update(user.id, user)
    await this.subcriptionRepository.delete(id);
  }

  async createSubcription(type: string, price: number){
    const dateInit = new Date();
    const dateFin = new Date(dateInit.getTime());
    dateFin.setDate(dateFin.getDate() + 30);
    const subcription = this.subcriptionRepository.create({
        type: type,
        status: 'active',
        dateInit: dateInit,
        dateFin: dateFin,
        price: price,
      });
      return await this.subcriptionRepository.save(subcription);
  }

  async updateSubcriptionType(id: string, type: string, status: string) {

    if (status==="active"){
        const subcription = await this.subcriptionRepository.findOne({where: {id}})
        const dateInit = new Date();
        const dateFin = new Date(dateInit.getTime());
        dateFin.setDate(dateFin.getDate() + 30);
    
        subcription.type = type,
        subcription.status = "active",
        subcription.dateInit = dateInit,
        subcription.dateFin = dateFin
    
        return await this.subcriptionRepository.save(subcription);
    } else if(status==="inactive") {
        const subcription = await this.subcriptionRepository.findOne({where: {id}})
        const dateInit = new Date();
        const dateFin = new Date(dateInit.getTime());
        dateFin.setDate(dateFin.getDate() + 30);
    
        subcription.type = type,
        subcription.status = "inactive",
        subcription.dateInit = dateInit,
        subcription.dateFin = dateFin
    
        return await this.subcriptionRepository.save(subcription);
    } else {
        throw new BadRequestException("El status es Incorrecto")
    }
  }
}
