import { Entity } from "./Entity";

export type AddressType = 'HOUSE' | 'APARTMENT';

export type AddressProps = {
  street: string;
  block: string;
  number: string;
  complement?: string;
  state: string;
  type: AddressType;
  customerId: string;
  createdAt: Date;
}

export class Address extends Entity<AddressProps> {
  private constructor(props: AddressProps, _id?: string) {
    super(props, _id);
  }

  static create(props: AddressProps, _id: string) {
    const address = new Address(props, _id);

    return address;
  }
}