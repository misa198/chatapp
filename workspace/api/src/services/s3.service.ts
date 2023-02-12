import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_REGION'),
    });
  }

  public async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
    };
    // upload and return public url
    const { Location } = await this.s3.upload(params).promise();
    return Location;
  }
}
