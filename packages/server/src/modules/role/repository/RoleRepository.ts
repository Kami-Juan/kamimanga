import { PrismaClient, Role } from '@prisma/client';
import { RoleType } from '../../../configuration/utils';

type IRoleRepository = {
  getRole(roleName: RoleType): Promise<Role | null>;
};

export class RoleRepository implements IRoleRepository {
  constructor(private ctx: PrismaClient) {}

  async getRole(roleName: RoleType): Promise<Role | null> {
    const role = await this.ctx.role.findFirst({
      where: {
        name: roleName,
      },
    });

    return role;
  }
}
