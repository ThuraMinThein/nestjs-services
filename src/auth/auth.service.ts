import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthDtos } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { Not, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth, google } from 'googleapis';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersReporitory: Repository<User>,
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  //functions
  hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  async createAccessToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email: email,
    };
    const secretKey = this.configService.get('JWT_SECRET_KEY');
    let token: string;
    try {
      token = await this.jwtService.signAsync(payload, {
        secret: secretKey,
        expiresIn: '1d',
      });

      return token;
    } catch (error) {
      //   console.log(error);
      console.log(error);
    }
  }

  //services

  async googleAuthRedirect(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }

  async signUp(authDto: AuthDtos) {
    //check emial exist
    await this.usersService.findUserByEmail(authDto.email);

    //hash password
    const hash = this.hashPassword(authDto.password);

    //create user
    const user = this.usersReporitory.create({ ...authDto, password: hash });

    const result = await this.usersReporitory.save(user);
    //jwt token create
    const access_token = await this.createAccessToken(result.id, result.email);

    //reutrn user
    return { ...result, access_token };
  }

  async signIn(authDto: AuthDtos) {
    const { email, password } = authDto;
    const user = await this.usersService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      throw new UnauthorizedException('Invalid credentials');
    const access_token = await this.createAccessToken(user.id, user.email);
    delete user.password;
    return {
      ...user,
      access_token,
    };
  }
}
