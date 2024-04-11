declare module "mModel" {
  import { Document } from "mongoose";
  export interface IDiscountModel extends Document {
    discount_name: string;
    discount_description: string;
    discount_type: "fixed_amount" | "percentage";
    discount_value: number;
    discount_code: string;
    discount_start_day: Date;
    discount_end_day: Date;
    discount_max_uses: number;
    discount_uses_count: number;
    discount_users_used: Array<{ id: string; count: number }>;
    discount_max_uses_per_user: number;
    discount_min_order_value: number;
    discount_shop_id: string;
    discount_is_active: boolean;
    discount_applies_to: "all" | "specific";
    discount_product_ids: string[];
  }
}
