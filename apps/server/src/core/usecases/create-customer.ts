import { hash } from "bcryptjs";
import { PrismaCustomerRepository } from "../../infra/repositories/prisma/prisma-customer-repository";
import { EmailAlreadyTakenError } from "../errors/EmailAlreadyTakenError";

interface CreateCustomerRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateCustomer {
  constructor(private repository: PrismaCustomerRepository) {}

  async execute({ name, email, password }: CreateCustomerRequest) {
    const customerAlreadyExists = await this.repository.findByEmail(email);

    if (customerAlreadyExists) {
      throw new EmailAlreadyTakenError('Email já está uso');
    }

    const customer = await this.repository.save({ name, email, password: await hash(password, 6) });

    return {
      customer,
    }
  }
}