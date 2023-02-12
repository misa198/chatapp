import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConversationUserRepository } from '@/repositories/conversation-user.repository';
import { ConversationRepository } from '@/repositories/conversation';
import { In, Not } from 'typeorm';
import { UserRepository } from '@/repositories/user.repository';
import { EventsGateway } from '@/controllers/events.gateway';
import { MessageRepository } from '@/repositories/message.repository';
import { S3Service } from './s3.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly conversationUserRepository: ConversationUserRepository,
    private readonly conversationRepository: ConversationRepository,
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
    private readonly eventsGateway: EventsGateway,
    private readonly s3Service: S3Service,
  ) {}

  public async listConversations(userId: string) {
    const conversationUsers = await this.conversationUserRepository.find({
      where: {
        userId,
      },
    });
    const conversationIds = conversationUsers.map((cu) => cu.conversationId);
    const conversations = await this.conversationRepository.find({
      where: {
        id: In(conversationIds),
      },
      order: {
        updatedAt: 'DESC',
      },
    });
    const conversationPartners = await this.conversationUserRepository.find({
      where: {
        conversationId: In(conversationIds),
        userId: Not(userId),
      },
    });
    const conversationPartnerIdsMap = new Map();
    const partnerIds = [];
    conversationPartners.forEach((cp) => {
      conversationPartnerIdsMap.set(cp.conversationId, cp.userId);
      partnerIds.push(cp.userId);
    });
    const partnerMap = new Map();
    const partners = await this.userRepository.find({
      where: {
        id: In(partnerIds),
      },
    });
    partners.forEach((p) => {
      partnerMap.set(p.id, p);
    });
    const conversationList = [];
    conversations.forEach((c) => {
      const partnerId = conversationPartnerIdsMap.get(c.id);
      const partner = partnerMap.get(partnerId);
      conversationList.push({
        id: c.id,
        partner: {
          id: partner.id,
          lastName: partner.lastName,
          firstName: partner.firstName,
          userName: partner.username,
        },
      });
    });
    return conversationList;
  }

  public async createConversation(userId: string, partnerId: string) {
    const partner = await this.userRepository.findOne({
      where: {
        id: partnerId,
      },
    });
    if (!partner) throw new NotFoundException('Partner not found');
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const conversation = await this.conversationRepository.create({
      name: `${userId}-${partnerId}`,
    });
    await this.conversationRepository.save(conversation);
    await this.conversationUserRepository.save({
      conversationId: conversation.id,
      userId,
    });
    await this.conversationUserRepository.save({
      conversationId: conversation.id,
      userId: partnerId,
    });
    const partnerRooms = this.eventsGateway.rooms.get(partnerId);
    if (partnerRooms) {
      partnerRooms.forEach((room) => {
        this.eventsGateway.server.to(room).emit('conversation-new', {
          id: conversation.id,
          partner: {
            id: userId,
            lastName: user.lastName,
            firstName: user.firstName,
            userName: user.username,
          },
        });
      });
    }
    const userRooms = this.eventsGateway.rooms.get(userId);
    if (userRooms) {
      userRooms.forEach((room) => {
        this.eventsGateway.server.to(room).emit('conversation-new', {
          id: conversation.id,
          partner: {
            id: partnerId,
            lastName: partner.lastName,
            firstName: partner.firstName,
            userName: partner.username,
          },
        });
      });
    }
  }

  public async listMessages(userId: string, conversationId: string) {
    const conversation = await this.conversationRepository.findOne({
      where: {
        id: conversationId,
      },
    });
    if (!conversation) throw new NotFoundException('Conversation not found');
    const conversationUsers = await this.conversationUserRepository.find({
      where: {
        conversationId,
        userId,
      },
    });
    if (conversationUsers.length === 0)
      throw new NotFoundException('Conversation not found');
    return this.messageRepository.find({
      where: {
        conversationId,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  public async createMessage(
    userId: string,
    conversationId: string,
    content: string,
  ) {
    const conversation = await this.conversationRepository.findOne({
      where: {
        id: conversationId,
      },
    });
    if (!conversation) throw new NotFoundException('Conversation not found');
    const conversationUsers = await this.conversationUserRepository.find({
      where: {
        conversationId,
      },
    });
    const conversationUserIds = conversationUsers.map((cu) => cu.userId);
    if (!conversationUserIds.includes(userId))
      throw new NotFoundException('Conversation not found');

    const message = await this.messageRepository.create({
      conversationId,
      content,
      userId,
    });
    const savedMsg = await this.messageRepository.save(message);
    const partnerIds = conversationUserIds.filter((id) => id !== userId);
    partnerIds.forEach((partnerId) => {
      const partnerRooms = this.eventsGateway.rooms.get(partnerId);
      if (partnerRooms) {
        partnerRooms.forEach((room) => {
          this.eventsGateway.server.to(room).emit('message-new', savedMsg);
        });
      }
    });
    const userRooms = this.eventsGateway.rooms.get(userId);
    if (userRooms) {
      userRooms.forEach((room) => {
        this.eventsGateway.server.to(room).emit('message-new', savedMsg);
      });
    }
  }

  public async createMessageWithFile(
    userId: string,
    conversationId: string,
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File is required');
    // validate file must be an image/video and size must be less than 5MB
    const fileExtension = file.originalname.split('.').pop();
    if (!['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov'].includes(fileExtension)) {
      throw new BadRequestException('Invalid file type');
    }
    // 5MB
    console.log(file.size);
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File size must be less than 5MB');
    }
    const conversation = await this.conversationRepository.findOne({
      where: {
        id: conversationId,
      },
    });
    if (!conversation) throw new NotFoundException('Conversation not found');
    const conversationUsers = await this.conversationUserRepository.find({
      where: {
        conversationId,
      },
    });
    const conversationUserIds = conversationUsers.map((cu) => cu.userId);
    if (!conversationUserIds.includes(userId))
      throw new NotFoundException('Conversation not found');
    const uploadedFile = await this.s3Service.uploadFile(file);
    const message = this.messageRepository.create({
      conversationId,
      content: uploadedFile,
      userId,
    });
    const savedMsg = await this.messageRepository.save(message);
    const partnerIds = conversationUserIds.filter((id) => id !== userId);
    partnerIds.forEach((partnerId) => {
      const partnerRooms = this.eventsGateway.rooms.get(partnerId);
      if (partnerRooms) {
        partnerRooms.forEach((room) => {
          this.eventsGateway.server.to(room).emit('message-new', savedMsg);
        });
      }
    });
    const userRooms = this.eventsGateway.rooms.get(userId);
    if (userRooms) {
      userRooms.forEach((room) => {
        this.eventsGateway.server.to(room).emit('message-new', savedMsg);
      });
    }
  }
}
