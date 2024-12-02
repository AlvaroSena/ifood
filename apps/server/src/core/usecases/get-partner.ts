import { PrismaPartnerRepository } from "../../infra/repositories/prisma/prisma-partner-repository";
import { ResourceNotFoundError } from "../errors/ResourceNotFoundError";

export class GetPartner {
  constructor(private repository: PrismaPartnerRepository) {}

  async execute({ partnerId }: { partnerId: string }) {
    const partner = await this.repository.findById(partnerId);

    if (!partner) {
      throw new ResourceNotFoundError('Parceiro não encontrado.')
    }

    return {
      partner,
    }
  }
}