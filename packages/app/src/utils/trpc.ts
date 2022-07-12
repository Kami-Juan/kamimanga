import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../../../server/src/app';

export const trpc = createReactQueryHooks<AppRouter>();
