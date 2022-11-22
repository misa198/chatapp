import { AuthController } from '@/controllers/auth.controller';
import { User } from '@/entities/User';
import { UserRepository } from '@/repositories/user.repository';
import { UserService } from '@/services/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
