import { Entity } from "./Entity";

export type ShippingStatus = 'PENDING' | 'SHIPPED' | 'DELIVERED';

export type ShippingProps = {
  orderId: string;
  addressId: string;
  status: ShippingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Shipping extends Entity<ShippingProps> {
  private constructor(props: ShippingProps, _id?: string) {
    super(props, _id);
  }

  static create(props: ShippingProps, _id: string) {
    const shipping = new Shipping(props, _id);

    return shipping;
  }
}