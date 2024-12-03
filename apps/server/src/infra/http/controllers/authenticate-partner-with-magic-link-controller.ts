import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthenticatePartnerWithMagicLink } from "../../../core/usecases/authenticate-partner-with-magic-link";
import { PrismaPartnerRepository } from "../../repositories/prisma/prisma-partner-repository";
import { prisma } from "../../prisma";

export class AuthenticatePartnerWithMagicLinkController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestQuerySchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = requestQuerySchema.parse(request.query);

    const repository = new PrismaPartnerRepository(prisma);
    const authenticatePartnerWithMagicLink = new AuthenticatePartnerWithMagicLink(repository);

    const token = await authenticatePartnerWithMagicLink.execute({ partnerId: id });

    return reply.send(token);
  }
}