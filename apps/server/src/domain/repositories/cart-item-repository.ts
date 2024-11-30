import { CartItem } from "../entitites/cart-item";

export interface CartItemRepository {
  save(cartitem: CartItem): Promise<CartItem>;
  findById(_id: string): Promise<CartItem | null>;
  findByEmail(email: string): Promise<CartItem | null>;
  findAll(): Promise<CartItem[]>;
}