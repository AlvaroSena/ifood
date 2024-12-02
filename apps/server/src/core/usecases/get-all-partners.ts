import { PrismaPartnerRepository } from "../../infra/repositories/prisma/prisma-partner-repository";

export class GetAllPartners {
  constructor(private repository: PrismaPartnerRepository) {}

  async execute() {
    const partners = await this.repository.findAll();

    return {
      partners,
    }
  }
}