import { Schema, model } from "mongoose";
import { IDiscountModel } from "mModel";
const DOCUMENT_NAME = "discount";
const COLLECTION_NAME = "Discounts";
export const DISCOUNT_TYPES = ["fixed_amount", "percentage"] as const;
const _schema = new Schema(
  {
    discount_name: {
      type: String,
      required: true,
    },
    discount_description: {
      type: String,
      required: true,
    },
    discount_type: {
      type: String,
      enum: DISCOUNT_TYPES,
      default: "fixed_amount",
    },
    discount_value: {
      type: String,
      required: true,
    },
    discount_code: {
      type: String,
      required: true,
    },
    discount_start_day: {
      type: Date,
      required: true,
    },
    discount_end_day: {
      type: Date,
      required: true,
    },
    discount_max_uses: {
      type: Number,
      required: true,
    },
    discount_uses_count: {
      type: Number,
      required: true,
    },
    discount_users_used: {
      type: Array,
      default: [],
    },
    discount_max_uses_per_user: {
      type: Number,
      required: true,
    },
    discount_min_order_value: {
      type: Number,
      required: true,
    },
    discount_shop_id: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },

    discount_is_active: {
      type: Boolean,
      required: true,
    },
    discount_applies_to: {
      type: String,
      required: true,
      enum: ["all", "specific"],
    },
    discount_product_ids: {
      type: Array,
      default: [],
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export default model<IDiscountModel>(DOCUMENT_NAME, _schema);
