import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPartnerRepository } from "../../repositories/prisma/prisma-partner-repository";
import { prisma } from "../../prisma";
import { ConfirmPartnerEmail } from "../../../core/usecases/confirm-partner-email";

export class ConfirmPartnerEmailController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email } = request.body;

    const repository = new PrismaPartnerRepository(prisma);
    const confirmPartnerEmail = new ConfirmPartnerEmail(repository);

    const partner = await confirmPartnerEmail.execute({ email });

    return reply.send(partner);
  }
}