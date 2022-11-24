import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePasswordReq {
  @IsNotEmpty()
  @MaxLength(255)
  public password: string;
}
