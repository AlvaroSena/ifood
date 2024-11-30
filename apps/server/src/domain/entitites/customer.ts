import { Entity } from "./Entity";

export type CustomerProps = {
  name: string;
  email: string;
  avatarUrl?: string;
  password: string;
  isEmailConfirmed: boolean;
  createdAt: Date;
}

export class Customer extends Entity<CustomerProps> {
  private constructor(props: CustomerProps, _id?: string) {
    super(props, _id);
  }

  static create(props: CustomerProps, _id: string) {
    const customer = new Customer(props, _id);

    return customer;
  }
}