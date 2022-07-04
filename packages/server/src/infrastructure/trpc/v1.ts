import superjson from 'superjson';
import { z } from 'zod';
import { createRouter } from '../../configuration/context';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge(
    'auth/',
    createRouter().mutation('signup-publisher', {
      input: z.object({
        username: z.string().min(6).max(255),
        password: z.string().min(8).max(255),
        email: z.string().email(),
      }),
      resolve: async ({ input }) => {
        return null;
      },
    }),
  );
