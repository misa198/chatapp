import { Asset } from '@/entities/Asset';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AssetRepository extends Repository<Asset> {
  constructor(
    @InjectRepository(Asset)
    repository: Repository<Asset>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
