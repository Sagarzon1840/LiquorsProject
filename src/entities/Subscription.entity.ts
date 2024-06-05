import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './User.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column()
  amount: number;

  @Column()
  dateInit: Date;

  @Column()
  dateFin: Date;

  @ManyToOne(() => Users, user => user.subscription)
  user: Users;
}
