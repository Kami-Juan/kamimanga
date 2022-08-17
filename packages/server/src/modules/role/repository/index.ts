import prisma from '../../../configuration/prisma';
import { RoleRepository } from './RoleRepository';

const roleRepository = new RoleRepository(prisma);

export { roleRepository };
