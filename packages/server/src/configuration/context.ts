import * as trpc from '@trpc/server';
import type { NodeHTTPCreateContextFnOptions } from '@trpc/server/dist/declarations/src/adapters/node-http';
import { IncomingMessage, ServerResponse } from 'http';
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

export const createRouter = () => trpc.router<Context>();
