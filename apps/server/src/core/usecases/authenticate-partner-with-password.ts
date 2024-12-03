import { compare } from "bcryptjs";
import { PrismaPartnerRepository } from "../../infra/repositories/prisma/prisma-partner-repository";
import { ResourceNotFoundError } from "../errors/ResourceNotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { sign } from 'jsonwebtoken';
import { env } from "../../env";

export class AuthenticatePartnerWithPassword {
  constructor(private repository: PrismaPartnerRepository) {}
  
  async execute({ email, password }: { email: string, password: string }) {
    const partner = await this.repository.findByEmail(email);

    if (!partner) {
      throw new UnauthorizedError('Email ou senha incorreto.')
    }

    const passwordMatches = await compare(password, partner.password!!);

    if (!passwordMatches) {
      throw new UnauthorizedError('Email ou senha incorreto.')
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