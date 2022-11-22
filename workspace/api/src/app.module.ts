import { Asset } from '@/entities/Asset';
import { Conversation } from '@/entities/Conversation';
import { ConversationUser } from '@/entities/ConversationUser';
import { Message } from '@/entities/Message';
import { User } from '@/entities/User';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Asset, Conversation, ConversationUser, Message, User],
        synchronize: false,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
