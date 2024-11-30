import { Partner } from "../entitites/partner";

export interface PartnerRepository {
  save(partner: Partner): Promise<Partner>;
  findById(_id: string): Promise<Partner | null>;
  findByEmail(email: string): Promise<Partner | null>;
  findAll(): Promise<Partner[]>;
}