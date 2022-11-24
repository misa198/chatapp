import { IsNotEmpty, MaxLength } from 'class-validator';

export class ResetPasswordReq {
  @IsNotEmpty()
  @MaxLength(255)
  public password: string;

  @IsNotEmpty()
  public token: string;
}
