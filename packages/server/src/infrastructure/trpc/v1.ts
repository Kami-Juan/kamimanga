import superjson from 'superjson';
import { createRouter } from '../../configuration/context';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge(
    'auth/',
    createRouter().mutation('signup', {
      resolve: async ({ ctx }) => {
        return null;
      },
    }),
  );
