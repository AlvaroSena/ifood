import { Address } from "../entitites/address";

export interface AddressRepository {
  save(address: Address): Promise<Address>;
  findById(_id: string): Promise<Address | null>;
  findByEmail(email: string): Promise<Address | null>;
  findAll(): Promise<Address[]>;
}