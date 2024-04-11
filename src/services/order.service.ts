import orderModel from "~/models/order.model";
import { createOrder } from "~/models/repositories/order.repo";
import { deleteCartItem, findCartById } from "~/models/repositories/cart.repo";
import { findProductById } from "~/models/repositories/product.repo";
import { applyDiscount } from "~/models/repositories/discount.repo";
import { acquireLock, releaseLock } from "~/services/redis.service";
import { startSession } from "mongoose";
import errorRes from "~/core/error.response";

/*
        {
            cartId,
            userId,
            shop_order_ids: [
                {
                    shopId,
                    products: [
                        {
                            quantity,
                            discountId,
                            productId,
                        }
                    ],
                }
            ]       
        }
     */

export const placedOrderByUser = async ({
  shop_order_ids,
  cartId = "unknown",
  userId = "unknown",
  user_address = {},
  user_payment = {}
}: {
  shop_order_ids: Array<{
    shopId: string;
    products: Array<{
      quantity: number;
      discountId: string;
      productId: string;
    }>;
  }>;
  cartId?: string;
  userId?: string;
  user_address: any;
  user_payment: any;
}) => {
  /*
  task: - check cart exists
  - get valid products and its price
  - evaluate products value
  - start transaction
  - apply discount
  - inventory reservation
  - remove product from cart
  - create order
  */
  const order_checkout = {
    totalPrice: 0,
    feeShip: 0,
    totalDiscount: 0
  };
  let product_ids = [];
  // check cartId exists
  const foundCart = findCartById(cartId);
  if (!foundCart) throw new errorRes("CONFLICT", "Cart not found");
  // [shopId, productId, quantity, discountId, price]
  const preApplyDiscount = await Promise.all(
    shop_order_ids.reduce((acc, item) => {
      const cur = item.products.map(async product => {
        // get valid products and its price
        product_ids.push(product.productId);
        const { product_price } = await findProductById({
          productId: product.productId,
          isPublish: true,
          projection: { select: ["product_price"] }
        });
        return {
          shopId: item.shopId,
          price: product_price * product.quantity,
          ...product
        };
      });
      return [...acc, ...cur];
    }, [])
  );
  //require replica set
  // const _session = await startSession();
  // await _session.withTransaction(async () => {
  try {
    await Promise.all(
      preApplyDiscount.map(async item => {
        const { shopId, productId, quantity, discountId, price } = item;
        const keyLock = await acquireLock({
          productId,
          quantity,
          cartId
          // session: _session,
        });
        if (keyLock) {
          await releaseLock({ keyLock });
        }
        if (discountId) {
          const discount_amount = await applyDiscount({
            userId,
            shopId,
            productId,
            discountId,
            cost: price
            // session: _session,
          });
          order_checkout.totalDiscount += discount_amount;
        }
        order_checkout.totalPrice += price;
      })
    );
  } catch (e) {
    console.log(e.message);
    throw new Error("transaction abort");
  }
  // });
  await Promise.all(
    preApplyDiscount.map(async (item: any) => {
      try {
        await deleteCartItem({ userId, productId: item.productId });
      } catch (e) {
        // backup have some changing in cart make sure no affect on order
      }
    })
  );
  const createdOrder = await createOrder({
    order_user_id: userId,
    order_checkout,
    order_tracking_number: "123",
    order_shipping: user_address,
    order_payment: user_payment,
    order_products: product_ids
  });
  if (!createdOrder) throw new errorRes("CONFLICT", "Error when create order");
  return createdOrder;
};

export const getOrderByUser = async () => {};
export const getOneOrderByUser = async ({ orderId, userId = "unknown" }) => {
  return await orderModel
    .findOne({
      _id: orderId,
      order_user_id: userId
    })
    .select({ __v: 0 })
    .lean()
    .exec();
};
export const cancelOrderByUser = async () => {};
export const updateOrderStatusByShop = async () => {};
