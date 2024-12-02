import { PrismaClient } from "@prisma/client";
import { PartnerProps } from "../../../domain/entitites/partner";
import { PartnerRepository } from "../../../domain/repositories/partner-repository";

export class PrismaPartnerRepository implements PartnerRepository {
  constructor(private prisma: PrismaClient) {}

  async save({ name, email, password }: PartnerProps): Promise<PartnerProps> {
    return await this.prisma.partner.create({
      data: {
        name,
        email,
        password: password!!
      },
    });
  }

  async findById(_id: string): Promise<PartnerProps | null> {
    const partner = await this.prisma.partner.findUnique({
      where: {
        id: _id,
      },
    })

    return partner;
  }

  async findByEmail(email: string): Promise<PartnerProps | null> {
    const partner = await this.prisma.partner.findUnique({
      where: {
        email,
      },
    })

    return partner;
  }

  async findAll(): Promise<PartnerProps[]> {
    const partners = await this.prisma.partner.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        isEmailConfirmed: true,
        createdAt: true,
      }
    });
    
    return partners;
  }

  async confirmEmail(email: string): Promise<PartnerProps> {
    const partner = await this.prisma.partner.update({
      where: {
        email,
      },
      data: {
        isEmailConfirmed: true,
      }
    });

    return partner;
  }
}