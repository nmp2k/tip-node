declare module "mModel" {
  import { Document } from "mongoose";
  export interface ICartModel extends Document {
    cart_state: string;
    cart_products: Array<{
      productId: string;
      shopId: string;
      quantity: number;
      quantity_sold: number;
      name: string;
      price: number;
    }>;
    cart_count_product: number;
    cart_user_id: string;
  }
}
