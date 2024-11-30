import { Entity } from "./Entity";

export type OrderItemProps = {
  orderId: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderItem extends Entity<OrderItemProps> {
  private constructor(props: OrderItemProps, _id?: string) {
    super(props, _id);
  }

  static create(props: OrderItemProps, _id: string) {
    const orderitem = new OrderItem(props, _id);

    return orderitem;
  }
}