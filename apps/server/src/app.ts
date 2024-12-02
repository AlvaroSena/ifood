import fastity from 'fastify'
import { routes } from './infra/http/routes';
import { EmailAlreadyTakenError } from './core/errors/EmailAlreadyTakenError';
import { ResourceNotFoundError } from './core/errors/ResourceNotFoundError';
import { ZodError } from 'zod';
import { UnauthorizedError } from './core/errors/UnauthorizedError';

export const app = fastity();
app.register(routes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (error instanceof EmailAlreadyTakenError) {
    return reply.status(409).send({ message: error.message })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send({ message: error.message })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({ message: error.message })
  }
});

app.get('/', (request, reply) => {
  return reply.send({ message: 'hello' });
});

app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(() => {
  console.log('Server running on http://localhost:3333')
});