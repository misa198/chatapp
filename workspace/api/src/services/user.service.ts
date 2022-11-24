import { Constants } from '@/common/Constants';
import { LoginReq } from '@/dtos/auth/LoginReq';
import { MeRes } from '@/dtos/auth/MeRes';
import { RegisterReq } from '@/dtos/auth/RegisterReq';
import { UserPayload } from '@/modals/UserPayload';
import { AssetRepository } from '@/repositories/asset.repository';
import { UserRepository } from '@/repositories/user.repository';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly assetRepository: AssetRepository,
    private readonly jwtService: JwtService,
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
