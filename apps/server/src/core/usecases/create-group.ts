import { PrismaGroupRepository } from "../../infra/repositories/prisma/prisma-group-repository";
import { PrismaMerchantRepository } from "../../infra/repositories/prisma/prisma-merchant-repository";
import { ResourceNotFoundError } from "../errors/ResourceNotFoundError";

interface CreateGroupRequest {
  name: string;
  description?: string | null
  merchantId: string
}

export class CreateGroup {
  constructor(private repository: PrismaGroupRepository, private merchantRepository: PrismaMerchantRepository) {}

  async execute({ name, description, merchantId }: CreateGroupRequest) {
    const merchant = await this.merchantRepository.findById(merchantId);

    if (!merchant) {
      throw new ResourceNotFoundError('Comércio não encontrado.')
    }

    const group = await this.repository.save({ name, description, merchantId });

    return {
      group,
    }
  }
}