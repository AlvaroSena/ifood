import { Customer } from "../entitites/customer";

export interface CustomerRepository {
  save(customer: Customer): Promise<Customer>;
  findById(_id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
}