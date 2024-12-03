import { compare } from "bcryptjs";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { sign } from 'jsonwebtoken';
import { env } from "../../env";
import { PrismaCustomerRepository } from "../../infra/repositories/prisma/prisma-customer-repository";

export class AuthenticateCustomerWithPassword {
  constructor(private repository: PrismaCustomerRepository) {}
  
  async execute({ email, password }: { email: string, password: string }) {
    const customer = await this.repository.findByEmail(email);

    if (!customer) {
      throw new UnauthorizedError('Email ou senha incorreto.')
    }

    const passwordMatches = await compare(password, customer.password!!);

    if (!passwordMatches) {
      throw new UnauthorizedError('Email ou senha incorreto.')
    }

    const token = sign({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      avatarUrl: customer.avatarUrl,
    }, env.JWT_SECRET, {
      subject: customer.id,
      expiresIn: env.JWT_EXPIRES_IN,
    });

    return {
      token,
    }
  }
}