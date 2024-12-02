import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPartnerRepository } from "../../repositories/prisma/prisma-partner-repository";
import { prisma } from "../../prisma";
import { SendPartnerConfirmationEmail } from "../../../core/usecases/send-partner-confirmation-email";
import { z } from "zod";

export class SendPartnerEmailConfirmationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestBodySchema = z.object({
      email: z.string().email(),
    })

    const { email } = requestBodySchema.parse(request.body);

    const repository = new PrismaPartnerRepository(prisma);
    const sendPartnerConfirmationEmail = new SendPartnerConfirmationEmail(repository);

    const result = await sendPartnerConfirmationEmail.execute({ email });

    return reply.send(result);
  }
}