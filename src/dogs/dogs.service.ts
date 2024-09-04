import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.services';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog) private dogsRepository: Repository<Dog>,
    private readonly usersService: UsersService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(
    user: User,
    image: Express.Multer.File,
    createDogDto: CreateDogDto,
  ) {
    const result = await this.cloudinaryService.storeImage(image, 'dogs');
    const dog = this.dogsRepository.create({
      ...createDogDto,
      image: result.url,
      user,
    });
    return this.dogsRepository.save(dog);
  }

  async findAll() {
    return this.dogsRepository.find({
      // where: {
      //   user: { id: user.id },
      // },
      relations: { user: true },
    });
  }

  async paginate(option: IPaginationOptions): Promise<Pagination<Dog>> {
    const dog = this.dogsRepository.createQueryBuilder();
    dog.orderBy('age', 'ASC');

    return paginate<Dog>(dog, option);
  }

  async findOne(user: User, id: number) {
    const foundDog = await this.dogsRepository.findOne({
      where: {
        id,
        user: { id: user.id },
      },
      relations: {
        user: true,
      },
    });
    if (!foundDog)
      throw new NotFoundException(`Dog not found in user ${user.email}`);

    return foundDog;
  }

  async update(
    user: User,
    id: number,
    newImage: Express.Multer.File,
    updateDogDto: UpdateDogDto,
  ) {
    const dog = await this.findOne(user, id);

    let image = dog.image;
    if (newImage) {
      const { url } = await this.cloudinaryService.storeImage(newImage, 'dogs');
      image = url;
      await this.cloudinaryService.deleteImage(dog.image);
    }

    const updatedDog = this.dogsRepository.create({
      ...dog,
      ...updateDogDto,
      image,
      user,
    });

    return this.dogsRepository.save(updatedDog);
  }

  async remove(user: User, id: number) {
    const dog = await this.findOne(user, id);
    await this.cloudinaryService.deleteImage(dog.image);
    await this.dogsRepository.delete(id);
    return dog;
  }
}
