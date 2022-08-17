import { TRPCError } from '@trpc/server';
import { Context } from '../../configuration/context';

export abstract class BaseController<T> {
  protected ctx: Context;
  protected dto: T;

  protected abstract executeImpl(): Promise<void | any>;

  public execute(ctx: Context, dto: T): void {
    this.ctx = ctx;
    this.dto = dto;

    this.executeImpl();
  }

  public clientError(message?: string) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message,
    });
  }

  public unauthorized(message?: string) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message,
    });
  }

  public forbidden(message?: string) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message,
    });
  }

  public notFound(message?: string) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message,
    });
  }

  public conflict(message?: string) {
    throw new TRPCError({
      code: 'CONFLICT',
      message,
    });
  }

  public fail(error: Error | string) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: error.toString(),
    });
  }
}
