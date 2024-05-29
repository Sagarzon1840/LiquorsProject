import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'favorites',
})
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
