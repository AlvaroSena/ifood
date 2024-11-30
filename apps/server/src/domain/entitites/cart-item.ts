import { Entity } from "./Entity";

export type CartItemProps = {
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CartItem extends Entity<CartItemProps> {
  private constructor(props: CartItemProps, _id?: string) {
    super(props, _id);
  }

  static create(props: CartItemProps, _id: string) {
    const cartitem = new CartItem(props, _id);

    return cartitem;
  }
}