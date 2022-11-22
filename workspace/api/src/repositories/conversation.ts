import { Conversation } from '@/entities/Conversation';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationRepository extends Repository<Conversation> {
  constructor(
    @InjectRepository(Conversation)
    repository: Repository<Conversation>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
