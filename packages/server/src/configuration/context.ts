import * as trpc from '@trpc/server';
import type { NodeHTTPCreateContextFnOptions } from '@trpc/server/dist/declarations/src/adapters/node-http';
import { IncomingMessage, ServerResponse } from 'http';
import { ZodError } from 'zod';
import { OpenApiMeta } from 'trpc-openapi';
import { getUserFromHeader } from './auth';

export const createContext = async ({
  req,
  res,
}: NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse>) => {
  const user = await getUserFromHeader(req.headers);

  return {
    headers: req.headers,
    user,
    req,
    res,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () =>
  trpc.router<Context, OpenApiMeta>().formatError(({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  });
