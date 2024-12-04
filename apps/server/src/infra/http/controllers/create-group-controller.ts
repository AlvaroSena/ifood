import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaGroupRepository } from "../../repositories/prisma/prisma-group-repository";
import { prisma } from "../../prisma";
import { PrismaMerchantRepository } from "../../repositories/prisma/prisma-merchant-repository";
import { CreateGroup } from "../../../core/usecases/create-group";

export class CreateGroupController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestBodySchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      merchantId: z.string(),
    });

    const { name, description, merchantId } = requestBodySchema.parse(request.body);

    const repository = new PrismaGroupRepository(prisma);
    const merchantRepository = new PrismaMerchantRepository(prisma);

    const createGroup = new CreateGroup(repository, merchantRepository);
  
    await createGroup.execute({ name, description, merchantId });

    return reply.status(201).send();
  }
}