import { Entity } from "./Entity";

export type ProductImageProps = {
  imageUrl: string;
  productId: string;
  createdAt: Date;
}

export class ProductImage extends Entity<ProductImageProps> {
  private constructor(props: ProductImageProps, _id?: string) {
    super(props, _id);
  }

  static create(props: ProductImageProps, _id: string) {
    const productimage = new ProductImage(props, _id);

    return productimage;
  }
}