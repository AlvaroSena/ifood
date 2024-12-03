import { hash } from "bcryptjs";
import { PrismaPartnerRepository } from "../../infra/repositories/prisma/prisma-partner-repository";
import { EmailAlreadyTakenError } from "../errors/EmailAlreadyTakenError";

interface CraetePartnerRequest {
  name: string;
  email: string;
  password: string;
}

export class CreatePartner {
  constructor(private repository: PrismaPartnerRepository) {}

  async execute({ name, email, password }: CraetePartnerRequest) {
    const partnerAlreadyExists = await this.repository.findByEmail(email);

    if (partnerAlreadyExists) {
      throw new EmailAlreadyTakenError('Endereço de email já está em uso.');
    }

    const partner = await this.repository.save({ name, email, password: await hash(password, 6) });

    return {
      partner,
    }
  }
}