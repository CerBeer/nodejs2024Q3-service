import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './auth.guard';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  @Public()
  @HttpCode(200)
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Post('refresh')
  @Public()
  @HttpCode(200)
  refresh(@Body() { refreshToken }: { refreshToken: string }) {
    console.log(refreshToken);
    return this.authService.refresh(refreshToken);
  }
}
