import { User } from 'src/users/entities/user.entity';
import { GROUP_ADMIN } from '../../utils/group.sealizer';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('dogs')
export class Dog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Expose({ groups: [GROUP_ADMIN] })
  @Column()
  image: string;

  @Column()
  age: number;

  @Expose({ groups: [GROUP_ADMIN] })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Expose({ groups: [GROUP_ADMIN] })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.dogs, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
