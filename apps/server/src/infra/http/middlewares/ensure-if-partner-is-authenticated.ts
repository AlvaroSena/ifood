import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { env } from "../../../env";
import { PrismaPartnerRepository } from "../../repositories/prisma/prisma-partner-repository";
import { prisma } from "../../prisma";

export async function ensureIfPartnerIsAuthenticated(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  const partnerRepository = new PrismaPartnerRepository(prisma);

  if (!authHeader) {
    return reply.status(401).send({ message: 'Token is missing!' });
  }

  const [, token] = authHeader.split(' ');

  const { sub } = verify(token, env.JWT_SECRET);

  const partner = await partnerRepository.findById(sub as string);

  if (!partner) {
    return reply.status(401).send({ message: 'Usuário não autorizado' });
  }

  request.id = sub as string;
}