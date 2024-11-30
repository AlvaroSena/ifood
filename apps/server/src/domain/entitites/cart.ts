import { Entity } from "./Entity";

export type CartProps = {
  customerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Cart extends Entity<CartProps> {
  private constructor(props: CartProps, _id?: string) {
    super(props, _id);
  }

  static create(props: CartProps, _id: string) {
    const cart = new Cart(props, _id);

    return cart;
  }
}