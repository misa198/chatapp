import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginReq {
  @IsNotEmpty()
  @MaxLength(255)
  public user: string;

  @IsNotEmpty()
  @MaxLength(255)
  public password: string;
}
