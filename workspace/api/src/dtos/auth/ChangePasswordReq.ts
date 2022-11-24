import { IsNotEmpty, MaxLength } from 'class-validator';

export class ChangePasswordReq {
  @IsNotEmpty()
  @MaxLength(255)
  public user: string;

  @IsNotEmpty()
  @MaxLength(255)
  public password: string;
}
