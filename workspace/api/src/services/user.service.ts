import { Constants } from '@/common/Constants';
import { RegisterReq } from '@/dtos/auth/RegisterReq';
import { UserRepository } from '@/repositories/user.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

  private async hashPassword(password: string) {
    const rounds = 10;
    return await bcrypt.hash(password, rounds);
  }
}
