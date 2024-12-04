import { PrismaGroupRepository } from "../../infra/repositories/prisma/prisma-group-repository";
import { PrismaProductRepository } from "../../infra/repositories/prisma/prisma-product-repository";
import { ResourceNotFoundError } from "../errors/ResourceNotFoundError";

interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  groupId: string;
}

export class CreateProduct {
  constructor(private repository: PrismaProductRepository, private groupRepository: PrismaGroupRepository) {}

  async execute({ name, description, price, groupId }: CreateProductRequest) {
    const group = await this.groupRepository.findById(groupId);

    if (!group) {
      throw new ResourceNotFoundError('Grupo não encontrado.');
    }

    await this.repository.save({ name, description, priceInCents: price * 100, groupId });
  }
}