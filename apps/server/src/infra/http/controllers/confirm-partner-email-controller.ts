import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPartnerRepository } from "../../repositories/prisma/prisma-partner-repository";
import { prisma } from "../../prisma";
import { ConfirmPartnerEmail } from "../../../core/usecases/confirm-partner-email";
import { z } from "zod";

export class ConfirmPartnerEmailController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestBodySchema = z.object({
      email: z.string().email(),
    })

    const { email } = requestBodySchema.parse(request.body);

    const repository = new PrismaPartnerRepository(prisma);
    const confirmPartnerEmail = new ConfirmPartnerEmail(repository);

    const partner = await confirmPartnerEmail.execute({ email });

    return reply.send(partner);
  }
}