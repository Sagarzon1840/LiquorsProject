import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reviews } from './review.entity';
import { Users } from './User.entity';


@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({type: 'text', nullable: true})
  imgUrl: string;
  
  @Column({ type: 'varchar', length: 30, nullable: false })
  category: string;
  
  // alchol by volumen
  @Column({type: 'float', nullable: false})
  abv: number;

  @Column()
  brand: string;

  @Column()
  country: string;

  @Column()
  size: string;

  @Column()
  userId: string;

  @JoinColumn({ name: 'review_id' })
  @OneToMany(() => Reviews, (reviews) => reviews.productId)
  reviewId: Reviews[];

  @ManyToMany(()=> Users, (user)=> user.favorites)
  users: Users[];
}