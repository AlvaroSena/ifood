import { Order } from "../entitites/order";

export interface OrderRepository {
  save(order: Order): Promise<Order>;
  findById(_id: string): Promise<Order | null>;
  findByEmail(email: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
}