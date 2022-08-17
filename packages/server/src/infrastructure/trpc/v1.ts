import superjson from 'superjson';
import { generateOpenApiDocument } from 'trpc-openapi';
import { createRouter } from '../../configuration/context';
import { userRouter } from '../../modules/user/infrastructure/trpc/routes';

export const appRouter = createRouter().transformer(superjson).merge('auth/', userRouter);

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Kamimanga OpenAPI',
  version: '1.0.0',
  baseUrl: 'http://localhost:3001/api',
});
