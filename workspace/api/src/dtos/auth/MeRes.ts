import { User } from '@/entities/User';

export class MeRes {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;

  constructor(user: User, profilePicture?: string) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.profilePicture = profilePicture;
  }
}
