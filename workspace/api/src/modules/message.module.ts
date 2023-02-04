import { EventsGateway } from '@/controllers/events.gateway';
import { MessageController } from '@/controllers/message.controller';
import { User } from '@/entities/User';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from '@/entities/Conversation';
import { ConversationUser } from '@/entities/ConversationUser';
import { Message } from '@/entities/Message';
import { UserRepository } from '@/repositories/user.repository';
import { ConversationRepository } from '@/repositories/conversation';
import { ConversationUserRepository } from '@/repositories/conversation-user.repository';
import { MessageRepository } from '@/repositories/message.repository';
import { MessageService } from '@/services/message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Conversation, ConversationUser, Message]),
  ],
  controllers: [MessageController],
  providers: [
    MessageService,
    EventsGateway,
    UserRepository,
    ConversationRepository,
    ConversationUserRepository,
    MessageRepository,
  ],
})
export class MessageModule {}
