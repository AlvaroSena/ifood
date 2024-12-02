import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPartnerRepository } from "../../repositories/prisma/prisma-partner-repository";
import { prisma } from "../../prisma";
import { GetAllPartners } from "../../../core/usecases/get-all-partners";

export class GetAllPartnersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const repository = new PrismaPartnerRepository(prisma);
    const getAllPartners = new GetAllPartners(repository);

    const partners = await getAllPartners.execute();

    return reply.send(partners);
  }
}