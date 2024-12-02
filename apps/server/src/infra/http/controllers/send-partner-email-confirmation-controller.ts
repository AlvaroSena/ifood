import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPartnerRepository } from "../../repositories/prisma/prisma-partner-repository";
import { prisma } from "../../prisma";
import { SendPartnerConfirmationEmail } from "../../../core/usecases/send-partner-confirmation-email";

export class SendPartnerEmailConfirmationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email } = request.body;

    const repository = new PrismaPartnerRepository(prisma);
    const sendPartnerConfirmationEmail = new SendPartnerConfirmationEmail(repository);

    const result = await sendPartnerConfirmationEmail.execute({ email });

    return reply.send(result);
  }
}