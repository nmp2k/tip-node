declare module "mModel" {
  import { Document } from "mongoose";
  type ORDER_STATES = [
    "pending",
    "confirmed",
    "shipped",
    "cancelled",
    "delivered"
  ];
  type order_checkout = {
    totalPrice: number;
    feeShip: number;
    totalDiscount: number;
  };
  type order_shipping = {
    detailAddress: string;
    street: string;
    city: string;
    province: string;
    country: string;
  };
  export interface IOrderModel extends Document {
    order_user_id: string;
    order_checkout: order_checkout;
    order_shipping: order_shipping;
    order_state: ORDER_STATES[number];
    order_payment: object;
    order_products: object[];
    order_tracking_number: string;
  }
}
