import { Merchant } from "../entitites/merchant";

export interface MerchantRepository {
  save(merchant: Merchant): Promise<Merchant>;
  findById(_id: string): Promise<Merchant | null>;
  findByEmail(email: string): Promise<Merchant | null>;
  findAll(): Promise<Merchant[]>;
}