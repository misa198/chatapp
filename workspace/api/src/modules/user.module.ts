import { AuthController } from '@/controllers/auth.controller';
import { Asset } from '@/entities/Asset';
import { User } from '@/entities/User';
import { AssetRepository } from '@/repositories/asset.repository';
import { UserRepository } from '@/repositories/user.repository';
import { JwtStrategy } from '@/security/jwt.strategy';
import { UserService } from '@/services/user.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Asset]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, UserRepository, AssetRepository, JwtStrategy],
})
export class UserModule {}
