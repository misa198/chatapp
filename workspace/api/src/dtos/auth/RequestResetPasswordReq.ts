import { IsNotEmpty, MaxLength } from 'class-validator';

export class RequestResetPasswordReq {
  @IsNotEmpty()
  @MaxLength(255)
  public user: string;
}
