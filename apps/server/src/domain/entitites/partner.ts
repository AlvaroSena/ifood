import { Entity } from "./Entity";

export type PartnerProps = {
  name: string;
  email: string;
  avatarUrl?: string;
  password: string;
  cnpj: string;
  isEmailConfirmed: boolean;
  createdAt: Date;
}

export class Partner extends Entity<PartnerProps> {
  private constructor(props: PartnerProps, _id?: string) {
    super(props, _id);
  }

  static create(props: PartnerProps, _id: string) {
    const partner = new Partner(props, _id);

    return partner;
  }
}