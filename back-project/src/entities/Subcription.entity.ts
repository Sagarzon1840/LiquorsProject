import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from 'src/entities/User.entity';

@Entity({
  name: 'subcription',
})
export class Subcription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  status: "active" | "inactive";

  @Column()
  dateInit: Date;

  @Column()
  dateFin: Date;

  @Column()
  price: number;

  // @OneToOne()
  // userId: Users;
}
