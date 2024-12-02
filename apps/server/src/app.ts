import fastity from 'fastify'
import { routes } from './infra/http/routes';
import { EmailAlreadyTakenError } from './core/errors/EmailAlreadyTakenError';

export const app = fastity();
app.register(routes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof EmailAlreadyTakenError) {
    return reply.status(409).send({ message: error.message })
  }
})

app.get('/', (request, reply) => {
  return reply.send({ message: 'hello' });
});

app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(() => {
  console.log('Server running on http://localhost:3333')
});