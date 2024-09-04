import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  UseFilters,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtos } from './dto/auth.dto';
import { TypeormExceptionFilter } from 'src/exceptionfilters/typeorm-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './guard/google-auth.guard';

@Controller({})
@UseFilters(TypeormExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleAuthRedirect(req);
  }

  @Post('signup')
  signUp(@Body() authDto: AuthDtos) {
    return this.authService.signUp(authDto);
  }

  @Post('signin')
  signin(@Body() authDto: AuthDtos) {
    return this.authService.signIn(authDto);
  }
}
