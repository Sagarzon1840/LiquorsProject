import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './User.entity';

@Entity({
  name: 'subscription',
})
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  status: 'active' | 'inactive';

  @Column()
  dateInit: Date;

  @Column()
  dateFin: Date;

  @Column()
  price: number;

  @OneToOne(() => Users, (user) => user.subscriptionId)
  userId: Users;
}
