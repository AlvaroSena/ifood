import { Shipping } from "../entitites/shipping";

export interface ShippingRepository {
  save(shipping: Shipping): Promise<Shipping>;
  findById(_id: string): Promise<Shipping | null>;
  findByEmail(email: string): Promise<Shipping | null>;
  findAll(): Promise<Shipping[]>;
}