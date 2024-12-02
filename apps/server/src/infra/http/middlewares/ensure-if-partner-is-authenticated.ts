import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";

export async function ensureIfPartnerIsAuthenticated(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  const secret = process.env.JWT_SECRET!!;

  if (!authHeader) {
    return reply.status(401).send({ message: 'Token is missing!' });
  }

  const [, token] = authHeader.split(' ');

  const { sub } = verify(token, secret);

  request.id = sub as string;
}