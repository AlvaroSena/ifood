import { Cart } from "../entitites/cart";

export interface CartRepository {
  save(cart: Cart): Promise<Cart>;
  findById(_id: string): Promise<Cart | null>;
  findByEmail(email: string): Promise<Cart | null>;
  findAll(): Promise<Cart[]>;
}