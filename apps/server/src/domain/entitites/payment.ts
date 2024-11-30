import { Entity } from "./Entity";

export type PaymentMethod = 'CREDIT CARD' | 'DEBIT CARD' | 'PIX' | 'CASH';
export type PaymentStatus = 'PENDING' | 'PAID' | 'REFUNDED'

export type PaymentProps = {
  orderId: string;
  method: PaymentMethod;
  amount: number;
  transactionId: string;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Payment extends Entity<PaymentProps> {
  private constructor(props: PaymentProps, _id?: string) {
    super(props, _id);
  }

  static create(props: PaymentProps, _id: string) {
    const payment = new Payment(props, _id);

    return payment;
  }
}