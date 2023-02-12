import { EventsGateway } from '@/controllers/events.gateway';
import { MessageController } from '@/controllers/message.controller';
import { Conversation } from '@/entities/Conversation';
import { ConversationUser } from '@/entities/ConversationUser';
import { Message } from '@/entities/Message';
import { User } from '@/entities/User';
import { ConversationRepository } from '@/repositories/conversation';
import { ConversationUserRepository } from '@/repositories/conversation-user.repository';
import { MessageRepository } from '@/repositories/message.repository';
import { UserRepository } from '@/repositories/user.repository';
import { MessageService } from '@/services/message.service';
import { S3Service } from '@/services/s3.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Conversation, ConversationUser, Message]),
  ],
  controllers: [MessageController],
  providers: [
    S3Service,
    MessageService,
    EventsGateway,
    UserRepository,
    ConversationRepository,
    ConversationUserRepository,
    MessageRepository,
  ],
})
export class MessageModule {}
