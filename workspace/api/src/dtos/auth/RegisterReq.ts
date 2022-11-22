import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class RegisterReq {
  @IsNotEmpty()
  @MaxLength(255)
  public username: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  public email: string;

  @IsNotEmpty()
  @MaxLength(255)
  public password: string;

  @IsNotEmpty()
  @MaxLength(255)
  public firstName: string;

  @IsNotEmpty()
  @MaxLength(255)
  public lastName: string;
}
