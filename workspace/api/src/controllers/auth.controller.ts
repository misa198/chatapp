import { LoginReq } from '@/dtos/auth/LoginReq';
import { RegisterReq } from '@/dtos/auth/RegisterReq';
import { UserPayload } from '@/modals/UserPayload';
import { AuthGuard } from '@/security/auth.guard';
import { CurrentUser } from '@/security/current-user.decorator';
import { UserService } from '@/services/user.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  public async register(@Body() body: RegisterReq) {
    return this.userService.register(body);
  }

  @Post('/login')
  public async login(@Body() body: LoginReq) {
    return this.userService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  public async me(@CurrentUser() user: UserPayload) {
    return this.userService.getInfo(user.id);
  }
}
