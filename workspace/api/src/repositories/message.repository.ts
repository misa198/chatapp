import { Message } from '@/entities/Message';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(
    @InjectRepository(Message)
    repository: Repository<Message>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
