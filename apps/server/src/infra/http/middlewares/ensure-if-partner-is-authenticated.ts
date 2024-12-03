import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { env } from "../../../env";

export async function ensureIfPartnerIsAuthenticated(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ message: 'Token is missing!' });
  }

  const [, token] = authHeader.split(' ');

  const { sub } = verify(token, env.JWT_SECRET);

  request.id = sub as string;
}