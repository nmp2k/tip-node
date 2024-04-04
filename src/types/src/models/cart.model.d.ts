declare module "mModel" {
  import { Document } from "mongoose";
  type cart_product = {
    productId: string;
    shopId: string;
    quantity: number;
  };
  export interface ICartModel extends Document {
    cart_state: string;
    cart_products: Array<cart_product>;
    cart_count_product: number;
    cart_user_id: string;
  }
}
