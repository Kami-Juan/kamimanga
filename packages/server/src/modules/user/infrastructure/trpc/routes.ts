import { createRouter } from '../../../../configuration/context';
import { singupOutputValidator, singupValidator } from '../../validations';

import { getSignupUseCase } from '../../useCases/signup';
import { TRPCError } from '@trpc/server';
import { StoreUserErrors } from '../../useCases/signup/StoreUserErrors';

export const userRouter = createRouter().mutation('signup-publisher', {
  meta: {
    openapi: { enabled: true, method: 'POST', path: '/auth/signup-publisher' },
  },
  input: singupValidator,
  output: singupOutputValidator,
  resolve: async ({ input }) => {
    const result = await getSignupUseCase.execute(input);

    if (result.isRight()) {
      return result.value.getValue();
    }

    const errors = result.value;

    switch (errors.constructor) {
      case StoreUserErrors.UserAlreadyStored:
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: errors.errorValue().message,
        });
      case StoreUserErrors.MissingRole:
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: errors.errorValue().message,
        });
      default:
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: errors.errorValue(),
        });
    }
  },
});
