import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../prisma";
import { AuthenticateCustomerWithPassword } from "../../../core/usecases/authenticate-customer-with-password";
import { PrismaCustomerRepository } from "../../repositories/prisma/prisma-customer-repository";

export class AuthenticateCustomerWithPasswordController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = requestBodySchema.parse(request.body);

    const repository = new PrismaCustomerRepository(prisma);
    const authenticateCustomer = new AuthenticateCustomerWithPassword(repository);

    const token = await authenticateCustomer.execute({ email, password });

    return reply.send(token);
  }
}