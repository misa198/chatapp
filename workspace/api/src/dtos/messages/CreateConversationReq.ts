import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateConversationReq {
  @IsNotEmpty()
  @IsUUID()
  public partnerId: string;
}
