import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TempStorage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  userId: string;

  @Column({nullable:true})
  amount: number;

  @Column({nullable:true})
  type: string;

  @Column({nullable:true})
  amountDif: number;

  @Column({ nullable: true })
  orderId: string; 
}