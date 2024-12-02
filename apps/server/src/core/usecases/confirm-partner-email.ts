import { PrismaPartnerRepository } from "../../infra/repositories/prisma/prisma-partner-repository";
import { ResourceNotFoundError } from "../errors/ResourceNotFoundError";

export class ConfirmPartnerEmail {
  constructor(private repository: PrismaPartnerRepository) {}

  async execute({ email }: { email: string }) {
    const partnerExists = await this.repository.findByEmail(email);

    if (!partnerExists) {
      throw new ResourceNotFoundError('Parceiro não encontrado.')
    }

    const partner = await this.repository.confirmEmail(email);

    return {
      partner,
    }
  }
}