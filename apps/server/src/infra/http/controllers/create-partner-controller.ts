import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPartnerRepository } from "../../repositories/prisma/prisma-partner-repository";
import { prisma } from "../../prisma";
import { CreatePartner } from "../../../core/usecases/create-partner";
import { z } from "zod";

export class CreatePartnerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestBodySchema = z.object({
      name: z.string().min(2, { message: 'Nome muito curto' }),
      email: z.string().email(),
      password: z.string().min(6, { message: 'A senha deve conter no mínimo 6 caracteres' })
    })


    const { name, email, password } = requestBodySchema.parse(request.body);

    const repository = new PrismaPartnerRepository(prisma);
    const createPartner = new CreatePartner(repository);

    const partner = await createPartner.execute({ name, email, password });

    return reply.status(201).send(partner);
  }
}