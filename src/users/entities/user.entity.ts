import { Expose } from 'class-transformer';
import { Dog } from 'src/dogs/entities/dog.entity';
import { GROUP_ADMIN } from '../../utils/group.sealizer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Expose({ groups: [GROUP_ADMIN] })
  @Column({ nullable: true })
  profile: string;

  @Column({ unique: true })
  email: string;

  @Expose({ groups: [GROUP_ADMIN] })
  @Column()
  password: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  age: number;

  @Column({ default: 0 })
  dogCount: number;

  @Expose({ groups: [GROUP_ADMIN] })
  @DeleteDateColumn({ name: 'daleted_at' })
  deletedAt: Date;

  @Expose({ groups: [GROUP_ADMIN] })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Expose({ groups: [GROUP_ADMIN] })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Dog, (dog) => dog.user)
  dogs: Dog[];
}
