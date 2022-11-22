import { ConversationUser } from '@/entities/ConversationUser';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationUserRepository extends Repository<ConversationUser> {
  constructor(
    @InjectRepository(ConversationUser)
    repository: Repository<ConversationUser>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
