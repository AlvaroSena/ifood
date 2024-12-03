import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../prisma";
import { z } from "zod";
import { CreateCustomer } from "../../../core/usecases/create-customer";
import { PrismaCustomerRepository } from "../../repositories/prisma/prisma-customer-repository";

export class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestBodySchema = z.object({
      name: z.string().min(2, { message: 'Nome muito curto' }),
      email: z.string().email(),
      password: z.string().min(6, { message: 'A senha deve conter no mínimo 6 caracteres' })
    })

    const { name, email, password } = requestBodySchema.parse(request.body);

    const repository = new PrismaCustomerRepository(prisma);
    const createCustomer = new CreateCustomer(repository);

    const customer = await createCustomer.execute({ name, email, password });

    return reply.status(201).send(customer);
  }
}