import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EventsGateway } from '@/controllers/events.gateway';
import { AuthGuard } from '@/security/auth.guard';
import { CurrentUser } from '@/security/current-user.decorator';
import { UserPayload } from '@/modals/UserPayload';
import { MessageService } from '@/services/message.service';
import { CreateConversationReq } from '@/dtos/messages/CreateConversationReq';

@Controller('conversations')
export class MessageController {
  constructor(
    private readonly messageEvent: EventsGateway,
    private readonly messageService: MessageService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard)
  public listConversations(@CurrentUser() user: UserPayload) {
    return this.messageService.listConversations(user.id);
  }

  @Post('/')
  @UseGuards(AuthGuard)
  public createConversation(
    @CurrentUser() user: UserPayload,
    @Body() body: CreateConversationReq,
  ) {
    return this.messageService.createConversation(user.id, body.partnerId);
  }

  @Get('/:conversationId')
  @UseGuards(AuthGuard)
  public listMessages(
    @CurrentUser() user: UserPayload,
    @Param('conversationId') conversationId: string,
  ) {
    return this.messageService.listMessages(user.id, conversationId);
  }

  @Post('/:conversationId')
  @UseGuards(AuthGuard)
  public sendMessage(
    @CurrentUser() user: UserPayload,
    @Param('conversationId') conversationId: string,
    @Body('message') message: string,
  ) {
    return this.messageService.createMessage(user.id, conversationId, message);
  }
}
