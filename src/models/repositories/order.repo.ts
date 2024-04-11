import { IOrderModel } from "mModel";
import orderModel from "../order.model";

/**
 *
 * @param order_user_id string
 * @param order_checkout object
 * @param order_tracking_number string
 * @param order_products Array<productId>
 * @param order_shipping object
 * @param order_payment object
 * @returns created order
 */
export const createOrder = async (input: Partial<IOrderModel>) => {
  return await orderModel.create(input);
};
