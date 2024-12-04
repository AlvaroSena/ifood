import { ProductProps } from "../entitites/product";

export interface ProductRepository {
  save(product: ProductProps): Promise<ProductProps>;
  findById(_id: string): Promise<ProductProps | null>;
  findAll(): Promise<ProductProps[]>;
}