import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateMerchant } from "../../../core/usecases/create-merchant";
import { PrismaMerchantRepository } from "../../repositories/prisma/prisma-merchant-repository";
import { prisma } from "../../prisma";

export class CreateMerchantController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestBodySchema = z.object({
      name: z.string().min(2, { message: 'nome muito curto' }),
      description: z.string().min(8, { message: 'nome muito curto' }),
      cnpj: z.string().min(14, { message: 'CNPJ inválido' }),
    });

    const { name, description, cnpj } = requestBodySchema.parse(request.body);
    const partnerId = request.id;

    const repository = new PrismaMerchantRepository(prisma);
    const createMerchant = new CreateMerchant(repository);

    const merchant = await createMerchant.execute({ name, cnpj, description, partnerId });

    return reply.send(merchant);
  }
}