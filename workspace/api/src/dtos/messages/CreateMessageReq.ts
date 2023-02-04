import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageReq {
  @IsNotEmpty()
  @IsString()
  public content: string;
}
