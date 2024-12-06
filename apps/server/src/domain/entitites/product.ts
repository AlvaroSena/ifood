import { Entity } from "./Entity";

export type ProductProps = {
  id?: string
  name: string;
  description: string;
  priceInCents: number;
  groupId: string;
  isActive?: boolean;
  createdAt?: Date;
}

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, _id?: string) {
    super(props, _id);
  }

  static create(props: ProductProps, _id: string) {
    const product = new Product(props, _id);

    return product;
  }
}