import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPartnerRepository } from "../../repositories/prisma/prisma-partner-repository";
import { prisma } from "../../prisma";
import { GetPartner } from "../../../core/usecases/get-partner";
import { z } from "zod";

export class GetPartnerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestParamsSchema = z.object({
      partnerId: z.string().uuid(),
    })

    const { partnerId } = requestParamsSchema.parse(request.params);

    const repository = new PrismaPartnerRepository(prisma);
    const getPartner = new GetPartner(repository);

    const partner = await getPartner.execute({ partnerId });

    return reply.send(partner);
  }
}