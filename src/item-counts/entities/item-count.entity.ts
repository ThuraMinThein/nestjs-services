import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('item_counts')
export class ItemCount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  count: number;
}
