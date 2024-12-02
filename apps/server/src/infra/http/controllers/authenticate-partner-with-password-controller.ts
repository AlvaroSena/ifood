import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaPartnerRepository } from "../../repositories/prisma/prisma-partner-repository";
import { prisma } from "../../prisma";
import { AuthenticatePartnerWithPassword } from "../../../core/usecases/authenticate-partner-with-password";

export class AuthenticatePartnerWithPasswordController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = requestBodySchema.parse(request.body);

    const repository = new PrismaPartnerRepository(prisma);
    const authenticatePartner = new AuthenticatePartnerWithPassword(repository);

    const token = await authenticatePartner.execute({ email, password });

    return reply.send(token);
  }
}