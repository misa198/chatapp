import { Constants } from '@/common/Constants';
import { LoginReq } from '@/dtos/auth/LoginReq';
import { MeRes } from '@/dtos/auth/MeRes';
import { RegisterReq } from '@/dtos/auth/RegisterReq';
import { RequestResetPasswordReq } from '@/dtos/auth/RequestResetPasswordReq';
import { ResetPasswordReq } from '@/dtos/auth/ResetPasswordReq';
import { ResetPasswordPayload } from '@/modals/ResetPasswordPayload';
import { UserPayload } from '@/modals/UserPayload';
import { AssetRepository } from '@/repositories/asset.repository';
import { UserRepository } from '@/repositories/user.repository';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly assetRepository: AssetRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(body: RegisterReq) {
    const foundUserByEmail = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });
    if (foundUserByEmail)
      throw new ConflictException({
        code: Constants.ERROR_CODES.CONFLICT_EMAIL,
      });

    const foundUserByUsername = await this.userRepository.findOne({
      where: {
        username: body.username,
      },
    });
    if (foundUserByUsername)
      throw new ConflictException({
        code: Constants.ERROR_CODES.CONFLICT_USERNAME,
      });

    const hashedPassword = await this.hashPassword(body.password);
    await this.userRepository.save({
      email: body.email,
      username: body.username,
      password: hashedPassword,
      lastName: body.lastName,
      firstName: body.firstName,
    });
  }

  public async login(body: LoginReq) {
    const foundUser = await this.findUserByEmailOrUsername(body.user);
    if (!foundUser) throw new UnauthorizedException();
    const payload: UserPayload = {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      lastName: foundUser.lastName,
      firstName: foundUser.firstName,
    };
    const verified = bcrypt.compareSync(body.password, foundUser.password);
    if (!verified) throw new UnauthorizedException();
    const token = this.jwtService.sign(payload);
    return { token };
  }

  public async getInfo(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException();
    if (user.profilePictureId) {
      const profilePicture = await this.assetRepository.findOne({
        where: { id: user.profilePictureId },
      });
      return new MeRes(user, profilePicture.uri);
    }
    return new MeRes(user);
  }

  public async updatePassword(id: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    await this.userRepository.update({ id }, { password: hashedPassword });
  }

  public async requestResetPassword(body: RequestResetPasswordReq) {
    const foundUser = await this.findUserByEmailOrUsername(body.user);
    if (!foundUser) throw new NotFoundException();
    const token = jwt.sign(
      {
        id: foundUser.id,
      },
      this.configService.get('JWT_RESET_PASSWORD_SECRET'),
      {
        expiresIn: this.configService.get('JWT_RESET_PASSWORD_EXPIRES_IN'),
      },
    );
    return { token };
  }

  public async resetPassword(body: ResetPasswordReq) {
    try {
      const payload = jwt.verify(
        body.token,
        this.configService.get('JWT_RESET_PASSWORD_SECRET'),
      ) as ResetPasswordPayload;
      await this.updatePassword(payload.id, body.password);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  public async requestVerify(id: string) {
    const token = jwt.sign(
      {
        id,
      },
      this.configService.get('JWT_VERIFY_EMAIL_SECRET'),
      {
        expiresIn: this.configService.get('JWT_VERIFY_EMAIL_EXPIRES_IN'),
      },
    );
    return { token };
  }

  public async verify(token: string) {
    try {
      const payload = jwt.verify(
        token,
        this.configService.get('JWT_VERIFY_EMAIL_SECRET'),
      ) as UserPayload;
      await this.userRepository.update(
        { id: payload.id },
        { isVerified: true },
      );
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private findUserByEmailOrUsername = async (user: string) =>
    this.userRepository.findOne({
      where: [
        {
          email: user,
        },
        {
          username: user,
        },
      ],
    });

  private async hashPassword(password: string) {
    const rounds = 10;
    return await bcrypt.hash(password, rounds);
  }
}
