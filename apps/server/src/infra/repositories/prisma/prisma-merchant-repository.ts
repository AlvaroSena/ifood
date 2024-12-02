import { PrismaClient } from "@prisma/client";
import { MerchantProps } from "../../../domain/entitites/merchant";
import { MerchantRepository } from "../../../domain/repositories/merchant-repository";

export class PrismaMerchantRepository implements MerchantRepository {
  constructor(private prisma: PrismaClient) {}

  async save(merchant: MerchantProps): Promise<MerchantProps> {
    return await this.prisma.merchant.create({
      data: merchant,
    })
  }

  async findById(_id: string): Promise<MerchantProps | null> {
    const merchant = await this.prisma.merchant.findUnique({
      where: {
        id: _id,
      }
    });

    return merchant;
  }

  async findByCNPJ(cnpj: string): Promise<MerchantProps | null> {
    const merchant = await this.prisma.merchant.findUnique({
      where: {
        cnpj,
      }
    });

    return merchant;
  }

  async findAll(): Promise<MerchantProps[]> {
    const merchants = await this.prisma.merchant.findMany();

    return merchants;
  }
}