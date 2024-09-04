import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { events } from '../constants/event.constant';
import { VerifyService } from '../services/phone verify/verify.service';

@Injectable()
export class UsersService {
  twilioService: any;
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly verifyService: VerifyService,
  ) {}

  //functions
  @OnEvent(events.CREATED_DOG)
  async increaseDog(payload: User) {
    const user = await this.findOne(payload.id);
    const dogCount = user.dogCount + 1;
    const added = this.usersRepository.create({
      ...user,
      dogCount,
    });
    return this.usersRepository.save(added);
  }
  findUserByEmail(email: string) {
    try {
      return this.usersRepository.findOne({
        where: { email },
      });
    } catch (error) {
      console.log(error);
    }
  }

  //services
  async getLoginUser(user: User) {
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const { phoneNumber } = createUserDto;
    if (phoneNumber) {
      sendVerificationCode(phoneNumber);
    }

    const user = this.usersRepository.create({ ...createUserDto });
    const finduser = await this.findUserByEmail(user.email);
    if (finduser) throw new ConflictException('email is already exist');
    return this.usersRepository.save(user);
  }

  async findAll(name?: string) {
    if (name) return this.usersRepository.findBy({ name });
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const { phoneNumber } = updateUserDto;
    if (phoneNumber) {
      console.log(phoneNumber);
      await this.verifyService.sendVerificationCode(phoneNumber);
    }
    // if (isEmailUsed) throw new ConflictException('email is used');
    const updatedUser = await this.usersRepository.update(id, updateUserDto);

    return updatedUser;
  }

  async remove(id: number) {
    return this.usersRepository.softDelete(id);
  }
}
function sendVerificationCode(phoneNumber: string) {
  throw new Error('Function not implemented.');
}
