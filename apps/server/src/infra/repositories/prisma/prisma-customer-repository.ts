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
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: _id,
      }
    });

    return customer;
  }

  async findByEmail(email: string): Promise<CustomerProps | null> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        email: email,
      }
    });

    return customer;
  }

  async findAll(): Promise<CustomerProps[]> {
    const customers = await this.prisma.customer.findMany();

    return customers;
  }
}