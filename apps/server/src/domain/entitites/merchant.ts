import { Entity } from "./Entity";

export type MerchantProps = {
  id?: string;
  name: string;
  cnpj: string;
  imageUrl?: string | null;
  description: string;
  partnerId: string;
  rate?: number;
  createdAt?: Date;
}

export class Merchant extends Entity<MerchantProps> {
  private constructor(props: MerchantProps, _id?: string) {
    super(props, _id);
  }

  static create(props: MerchantProps, _id: string) {
    const merchant = new Merchant(props, _id);

    return merchant;
  }
}