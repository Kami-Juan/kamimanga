import { Prisma, PrismaClient, Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

type IUserRepository = {
  existUser(username: string, email: string): Promise<boolean>;
  createUser(
    username: string,
    email: string,
    password: string,
    role: Role,
  ): Promise<Pick<User, 'id' | 'username' | 'email'>>;
  comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
  getHashedValue(password: string): Promise<string>;
};

const defaultResponse = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  username: true,
  email: true,
});

export class UserRepository implements IUserRepository {
  constructor(private ctx: PrismaClient) {}

  async existUser(username: string, email: string): Promise<boolean> {
    const user = await this.ctx.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          { username },
        ],
      },
    });

    return !!user === true;
  }

  async createUser(
    username: string,
    email: string,
    password: string,
    role: Role,
  ): Promise<Pick<User, 'id' | 'username' | 'email'>> {
    const user = await this.ctx.user.create({
      data: {
        email,
        username,
        password: await this.getHashedValue(password),
        roleId: role.id,
      },
      select: defaultResponse,
    });

    return user;
  }

  comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  getHashedValue(password: string): Promise<string> {
    return bcrypt.hash(password, 14);
  }
}
