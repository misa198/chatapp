import { IsNotEmpty } from 'class-validator';

export class VerifyParamsReq {
  @IsNotEmpty()
  public token: string;
}
