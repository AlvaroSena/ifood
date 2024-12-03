import { CustomerProps } from "../entitites/customer";

export interface CustomerRepository {
  save(customer: CustomerProps): Promise<CustomerProps>;
  findById(_id: string): Promise<CustomerProps | null>;
  findByEmail(email: string): Promise<CustomerProps | null>;
  findAll(): Promise<CustomerProps[]>;
}