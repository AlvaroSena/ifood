import { Partner, PartnerProps } from "../entitites/partner";

export interface PartnerRepository {
  save(partner: PartnerProps): Promise<PartnerProps>;
  findById(_id: string): Promise<PartnerProps | null>;
  findByEmail(email: string): Promise<PartnerProps | null>;
  findAll(): Promise<PartnerProps[]>;
}