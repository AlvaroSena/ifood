import { ProductImage } from "../entitites/product-image";

export interface ProductImageRepository {
  save(productimage: ProductImage): Promise<ProductImage>;
  findById(_id: string): Promise<ProductImage | null>;
  findByEmail(email: string): Promise<ProductImage | null>;
  findAll(): Promise<ProductImage[]>;
}