import { PrismaMerchantRepository } from "../../infra/repositories/prisma/prisma-merchant-repository"
import { MerchantAlreadyExistsError } from "../errors/MerchantAlreadyExistsError"

interface CreateMerchantRequest {
  name: string;
  description: string;
  cnpj: string;
  partnerId: string;
}

export class CreateMerchant {
  constructor(private repository: PrismaMerchantRepository) {}

  async execute({ name, cnpj, description, partnerId }: CreateMerchantRequest) {
    const merchantAlreadyExists = await this.repository.findByCNPJ(cnpj);

    if (merchantAlreadyExists) {
      throw new MerchantAlreadyExistsError('Comércio já está cadastrado.');
    }

    const merchant = await this.repository.save({
      name,
      cnpj,
      description,
      partnerId,
    });

    return {
      merchant,
    }
  }
}