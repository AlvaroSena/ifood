import { PrismaClient } from "@prisma/client";
import { CustomerRepository } from "../../../domain/repositories/customer-repository";
import { CustomerProps } from "../../../domain/entitites/customer";

export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prisma: PrismaClient) {}

  async save(customer: CustomerProps): Promise<CustomerProps> {
    return await this.prisma.customer.create({
      data: customer,
    });
  }

  async findById(_id: string): Promise<CustomerProps | null> {
    const partner = await this.prisma.customer.findUnique({
      where: {
        id: _id,
      }
    });

    return partner;
  }

  async findByEmail(email: string): Promise<CustomerProps | null> {
    const partner = await this.prisma.customer.findUnique({
      where: {
        id: email,
      }
    });

    return partner;
  }

  async findAll(): Promise<CustomerProps[]> {
    const partners = await this.prisma.customer.findMany();

    return partners;
  }
}