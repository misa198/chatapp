import { LoginReq } from '@/dtos/auth/LoginReq';
import { RegisterReq } from '@/dtos/auth/RegisterReq';
import { RequestResetPasswordReq } from '@/dtos/auth/RequestResetPasswordReq';
import { ResetPasswordReq } from '@/dtos/auth/ResetPasswordReq';
import { UpdatePasswordReq } from '@/dtos/auth/UpdatePasswordReq';
import { VerifyParamsReq } from '@/dtos/auth/VerifyParamsReq';
import { UserPayload } from '@/modals/UserPayload';
import { AuthGuard } from '@/security/auth.guard';
import { CurrentUser } from '@/security/current-user.decorator';
import { UserService } from '@/services/user.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

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

  @UseGuards(AuthGuard)
  @Post('/password/update')
  public async updatePassword(
    @CurrentUser() user: UserPayload,
    @Body() body: UpdatePasswordReq,
  ) {
    return this.userService.updatePassword(user.id, body.password);
  }

  @Post('/password/reset-request')
  public async requestResetPassword(@Body() body: RequestResetPasswordReq) {
    return this.userService.requestResetPassword(body);
  }

  @Post('/password/reset')
  public async resetPassword(@Body() body: ResetPasswordReq) {
    return this.userService.resetPassword(body);
  }

  @UseGuards(AuthGuard)
  @Get('/verify')
  public async requestVerify(@CurrentUser() user: UserPayload) {
    return this.userService.requestVerify(user.id);
  }

  @Get('/verify/:token')
  public async verify(@Param() params: VerifyParamsReq) {
    return this.userService.verify(params.token);
  }
}
