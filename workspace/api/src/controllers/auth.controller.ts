import { RegisterReq } from '@/dtos/auth/RegisterReq';
import { UserService } from '@/services/user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async register(@Body() body: RegisterReq) {
    return this.userService.register(body);
  }
}
