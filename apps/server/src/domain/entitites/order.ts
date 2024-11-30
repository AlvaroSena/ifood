import { Entity } from "./Entity";
import { PaymentStatus } from "./payment";

export type OrderStatus = 'PENDING' | 'IN PREPARATION' | 'COMPLETED' | 'ON THE WAY' | 'DELIVERED' | 'CANCELED';

export type OrderProps = {
  customerId: string;
  status: OrderStatus;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Order extends Entity<OrderProps> {
  private constructor(props: OrderProps, _id?: string) {
    super(props, _id);
  }

  static create(props: OrderProps, _id: string) {
    const order = new Order(props, _id);

    return order;
  }
}