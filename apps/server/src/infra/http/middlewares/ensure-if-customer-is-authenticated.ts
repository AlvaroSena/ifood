import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { env } from "../../../env";
import { prisma } from "../../prisma";
import { PrismaCustomerRepository } from "../../repositories/prisma/prisma-customer-repository";

export async function ensureIfCustomerIsAuthenticated(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  const customerRepository = new PrismaCustomerRepository(prisma);

  if (!authHeader) {
    return reply.status(401).send({ message: 'Token is missing!' });
  }

  const [, token] = authHeader.split(' ');

  const { sub } = verify(token, env.JWT_SECRET);

  const customer = await customerRepository.findById(sub as string);

  if (!customer) {
    return reply.status(401).send({ message: 'Usuário não autorizado' });
  }

  request.id = sub as string;
}