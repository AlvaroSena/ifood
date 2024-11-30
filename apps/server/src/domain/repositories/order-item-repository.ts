import { OrderItem } from "../entitites/order-item";

export interface OrderItemRepository {
  save(orderitem: OrderItem): Promise<OrderItem>;
  findById(_id: string): Promise<OrderItem | null>;
  findByEmail(email: string): Promise<OrderItem | null>;
  findAll(): Promise<OrderItem[]>;
}