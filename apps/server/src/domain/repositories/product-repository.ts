import { Product } from "../entitites/product";

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findById(_id: string): Promise<Product | null>;
  findByEmail(email: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
}