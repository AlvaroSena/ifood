import { compare } from "bcryptjs";
import { PrismaPartnerRepository } from "../../infra/repositories/prisma/prisma-partner-repository";
import { ResourceNotFoundError } from "../errors/ResourceNotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { sign } from 'jsonwebtoken';

export class AuthenticatePartnerWithPassword {
  constructor(private repository: PrismaPartnerRepository) {}
  
  async execute({ email, password }: { email: string, password: string }) {
    const partner = await this.repository.findByEmail(email);

    if (!partner) {
      throw new ResourceNotFoundError('Parceiro não encontrado.')
    }

    const passwordMatches = compare(password, partner.password!!);

    if (!passwordMatches) {
      throw new UnauthorizedError('Email ou senha incorreto.')
    }

    const secret = process.env.JWT_SECRET!!;
    const expiresIn = process.env.JWT_EXPIRES_IN!!;

    const token = await sign({
      id: partner.id,
      name: partner.name,
      email: partner.email,
      avatarUrl: partner.avatarUrl,
    }, secret, {
      subject: partner.id,
      expiresIn
    });

    return {
      token,
    }
  }
}