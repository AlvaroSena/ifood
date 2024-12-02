import { PrismaPartnerRepository } from "../../infra/repositories/prisma/prisma-partner-repository";
import { ResourceNotFoundError } from "../errors/ResourceNotFoundError";

export class SendPartnerConfirmationEmail {
  constructor(private repository: PrismaPartnerRepository) {}

  async execute({ email }: { email: string }) {
    const partner = await this.repository.findByEmail(email);

    if (!partner) {
      throw new ResourceNotFoundError('Parceiro não encontrado.')
    }

    return {
      link: 'http://localhost:3333/api/v1/partners/email-confirmation',
    }
  }
}