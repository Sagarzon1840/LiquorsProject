import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscription } from './Subscription.entity';
import { Reviews } from './review.entity';
import { Product } from './product.entity';
import { UserRole } from 'src/enums/roles.enum';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 128, //bcript
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
    nullable: false,
  })
  role: UserRole;

  @JoinColumn({ name: 'subscriptionId' })
  @OneToOne(() => Subscription, (subscription) => subscription.userId)
  subscriptionId: Subscription;

  @JoinColumn({ name: 'review_id' })
  @OneToMany(() => Reviews, (review) => review.userId)
  reviews: Reviews[];

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'favorites_products',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'favorite_id',
      referencedColumnName: 'id',
    },
  })
  favorite: Product[];
}
