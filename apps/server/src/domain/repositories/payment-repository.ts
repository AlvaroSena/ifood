import { Payment } from "../entitites/payment";

export interface PaymentRepository {
  save(payment: Payment): Promise<Payment>;
  findById(_id: string): Promise<Payment | null>;
  findByEmail(email: string): Promise<Payment | null>;
  findAll(): Promise<Payment[]>;
}