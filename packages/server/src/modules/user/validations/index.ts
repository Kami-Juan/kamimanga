import { z } from 'zod';

export const singupValidator = z.object({
  username: z.string().min(6).max(255),
  password: z.string().min(8).max(255),
  email: z.string().email(),
});

export const singupOutputValidator = z.object({
  id: z.string().min(6).max(255),
  username: z.string().min(6).max(255),
  email: z.string().email(),
});
