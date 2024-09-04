import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @Optional()
  @IsString()
  @MinLength(3)
  name: string;

  @Optional()
  @IsString()
  profile: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  phoneNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ obj, key }) => parseInt(obj[key]))
  age: number;
}
