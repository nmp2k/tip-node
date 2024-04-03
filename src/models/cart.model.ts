import { Schema, model } from "mongoose";
import { ICartModel } from "mModel";
const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";
export const CART_STATES = [
  "active",
  "completed",
  "fail",
  "pending",
  "lock",
] as const;
const _schema = new Schema(
  {
    cart_state: {
      type: String,
      require: true,
      enum: CART_STATES,
      default: "active",
    },
    cart_products: {
      type: Array,
      require: true,
      default: [],
    },
    /**
     * {
     *     productId,
     *     shopId,
     *     quantity,
     *     name,
     *     price
     * }
     */
    cart_count_product: {
      type: Number,
      default: 0,
    },
    cart_user_id: {
      type: String,
      require: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export default model<ICartModel>(DOCUMENT_NAME, _schema);
