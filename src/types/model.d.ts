declare module "mModel" {
  import { productType } from "~/models/product_types";
  import { Document } from "mongoose";
  // ApiKey model document
  export interface IApiKey {
    key: string;
    status: boolean;
    permissions: Array<"0000" | "1111" | "2222">;
  }
  type proType = keyof typeof productType;

  export interface IProductModel extends Document {
    product_name: string;
    product_thumb: string;
    product_description?: string;
    product_price: number;
    product_quantity: number;
    product_type: proType;
    product_shop: string;
    product_attributes: any;
    product_slug: string;
    product_ratingAverage: number;
    product_variations: Array<any>;
    isPublish: boolean;
    isDraft: boolean;
  }
}
