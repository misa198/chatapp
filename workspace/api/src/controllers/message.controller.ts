import { EventsGateway } from '@/controllers/events.gateway';
import { CreateConversationReq } from '@/dtos/messages/CreateConversationReq';
import { CreateMessageReq } from '@/dtos/messages/CreateMessageReq';
import { UserPayload } from '@/modals/UserPayload';
import { AuthGuard } from '@/security/auth.guard';
import { CurrentUser } from '@/security/current-user.decorator';
import { MessageService } from '@/services/message.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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
    @Body() body: CreateMessageReq,
  ) {
    return this.messageService.createMessage(
      user.id,
      conversationId,
      body.content,
    );
  }

  // file upload
  @Post('/:conversationId/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  public uploadFile(
    @CurrentUser() user: UserPayload,
    @Param('conversationId') conversationId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.messageService.createMessageWithFile(
      user.id,
      conversationId,
      file,
    );
  }
}
