import { Schema, model } from "mongoose";
import { IOrderModel } from "mModel";
const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";
export const ORDER_STATES = [
  "pending",
  "confirmed",
  "shipped",
  "cancelled",
  "delivered",
] as const;
const _schema = new Schema(
  {
    order_user_id: {
      type: String,
      require: true,
    },
    order_checkout: {
      type: Object,
      require: true,
      default: {},
    },
    /**
     * order_checkout : {
     * totalPrice
     * feeShip
     * totalApplyDiscount}
     */
    order_shipping: {
      type: Object,
      require: true,
      default: {},
    },

    /**
     * order_shipping: {
     * detailAddress,
     * street,
     * city,
     * province,
     * country
     * }
     */
    order_state: {
      type: String,
      require: true,
      enum: ORDER_STATES,
      default: "pending",
    },
    order_payment: {
      type: Object,
      require: true,
      default: {},
    },
    order_products: {
      type: Array,
      require: true,
      default: [],
    },
    order_tracking_number: {
      type: String,
      require: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export default model<IOrderModel>(DOCUMENT_NAME, _schema);
