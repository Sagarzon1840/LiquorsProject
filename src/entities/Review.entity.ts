import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './User.entity';
import { Product } from './Product.entity';

@Entity({
  name: 'reviews',
})
export class Reviews {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 2, scale: 1 })
  rate: number;

  @Column()
  comment: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => Users, (user) => user.reviews)
  userId: Users;

  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product, (product) => product.reviewId)
  productId: Product;
}
