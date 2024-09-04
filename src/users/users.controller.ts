import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GROUP_USER } from 'src/utils/group.sealizer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ groups: [GROUP_USER] })
  @Get('me')
  getLoginUser(@Request() req) {
    return this.usersService.getLoginUser(req.user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ groups: [GROUP_USER] })
  findAll(@Query('name') name?: string) {
    return this.usersService.findAll(name);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ groups: [GROUP_USER] })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ groups: [GROUP_USER] })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ groups: [GROUP_USER] })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
