import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaPartnerRepository } from "../../repositories/prisma/prisma-partner-repository";
import { prisma } from "../../prisma";
import { SendPartnerMagicLink } from "../../../core/usecases/send-partner-magic-link";

export class SendPartnerMagicLinkController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestBodySchema = z.object({
      email: z.string().email(),
    });

    const { email } = requestBodySchema.parse(request.body);

    const repository = new PrismaPartnerRepository(prisma);
    const sendPartnerMagicLink = new SendPartnerMagicLink(repository);

    const link = await sendPartnerMagicLink.execute({ email });

    return reply.send(link);
  }
}