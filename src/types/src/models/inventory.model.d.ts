declare module "mModel" {
  import { Document } from "mongoose";
  export interface IInventoryModel extends Document {
    inventory_product_id: string;
    inventory_location: string;
    inventory_stock: number;
    inventory_shop_id: string;
    inventory_reservations: Array<{
      cardID: string;
      stock: number;
      createOn: Date;
    }>;
  }
}
