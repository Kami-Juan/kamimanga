import superjson from 'superjson';
import { createRouter } from '../../configuration/context';
import { userRouter } from '../../modules/user/infrastructure/trpc/routes';

export const appRouter = createRouter().transformer(superjson).merge('auth/', userRouter);
