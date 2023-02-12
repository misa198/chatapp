import { IsIn, IsNotEmpty } from 'class-validator';

export class UploadFileReq {
  // image | video | file
  @IsNotEmpty()
  @IsIn(['image', 'video', 'file'])
  type: string;
}
