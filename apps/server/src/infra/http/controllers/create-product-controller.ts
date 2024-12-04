import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaProductRepository } from "../../repositories/prisma/prisma-product-repository";
import { prisma } from "../../prisma";
import { PrismaGroupRepository } from "../../repositories/prisma/prisma-group-repository";
import { CreateProduct } from "../../../core/usecases/create-product";

export class CreateProductController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      groupId: z.string().uuid(),
    });

    const { name, description, price, groupId } = requestBodySchema.parse(request.body);

    const repository = new PrismaProductRepository(prisma);
    const groupRepository = new PrismaGroupRepository(prisma);

    const createProduct = new CreateProduct(repository, groupRepository);

    await createProduct.execute({ name, description, price, groupId });

    return reply.status(201).send();
  }
}