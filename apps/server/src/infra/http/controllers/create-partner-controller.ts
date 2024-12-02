import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPartnerRepository } from "../../repositories/prisma/prisma-partner-repository";
import { prisma } from "../../prisma";
import { CreatePartner } from "../../../core/usecases/create-partner";

export class CreatePartnerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body;

    const repository = new PrismaPartnerRepository(prisma);
    const createPartner = new CreatePartner(repository);

    const partner = await createPartner.execute({ name, email, password });

    return reply.status(201).send(partner);
  }
}