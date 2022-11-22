import { User } from '@/entities/User';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
