import { sign } from "jsonwebtoken";
import { env } from "../../env";
import { PrismaPartnerRepository } from "../../infra/repositories/prisma/prisma-partner-repository";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class AuthenticatePartnerWithMagicLink {
  constructor(private repository: PrismaPartnerRepository) {}

  async execute({ partnerId }: { partnerId: string }) {
    const partner = await this.repository.findById(partnerId);

    if (!partner) {
      throw new UnauthorizedError('Credenciais inválidas');
    }

    const token = sign({
      id: partner.id,
      name: partner.name,
      email: partner.email,
      avatarUrl: partner.avatarUrl,
    }, env.JWT_SECRET, {
      subject: partner.id,
      expiresIn: env.JWT_EXPIRES_IN,
    });

    return {
      token,
    }
  }
}