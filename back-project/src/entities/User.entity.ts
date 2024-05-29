import {
  Column,
  Entity,
//   OneToMany,
//   OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum SubscriptionType {
  BASIC = 'basic',
  PREMIUM = 'premium',
  SELLER = 'seller',
}

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
    default: UserRole.USER,
    nullable: false,
  })
  role: UserRole;

  //faltan traer la otras entidades

//   @OneToOne(() => Subscription, (subscription) => subscription.user)
//   subscription: Subscription;

//   @OneToMany(() => Review, (review) => review.user)
//   review: Review[];

//   @OneToOne(() => Favorite, (Favorite) => Favorite.user)
//   favorite: Favorite[];
}
