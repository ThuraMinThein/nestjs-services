import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDogDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  // @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ obj, key }) => parseInt(obj[key]))
  age: number;

  user: number;
}
