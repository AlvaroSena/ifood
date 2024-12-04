import { PrismaClient } from "@prisma/client";
import { ProductRepository } from '../../../domain/repositories/product-repository'
import { prisma } from "../../prisma";
import { ProductProps } from "../../../domain/entitites/product";

export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async save(product: ProductProps): Promise<ProductProps> {
    return await this.prisma.product.create({
      data: product,
    });
  }

  async findById(_id: string): Promise<ProductProps | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: _id,
      }
    });

    return product;
  }

  async findAll(): Promise<ProductProps[]> {
    const products = await this.prisma.product.findMany();

    return products;
  }

}