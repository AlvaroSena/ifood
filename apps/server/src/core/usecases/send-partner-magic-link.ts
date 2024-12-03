import { env } from "../../env";
import { PrismaPartnerRepository } from "../../infra/repositories/prisma/prisma-partner-repository";
import { ResourceNotFoundError } from "../errors/ResourceNotFoundError";

export class SendPartnerMagicLink {
  constructor(private repository: PrismaPartnerRepository) {}

  async execute({ email }: { email: string }) {
    const partner = await this.repository.findByEmail(email);

    if (!partner) {
      throw new ResourceNotFoundError('Parceiro não encontrado.');
    }

    if (env.NODE_ENV !== 'production') {
      return {
        link: env.BASE_URL.concat('/partners/sessions/magic-link?id=').concat(partner.id),
      }
    }

    // send link via email
  }
}