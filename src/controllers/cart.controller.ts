import successRes from "~/core/success.response";
import * as cartService from "../services/cart.service";
/**
 * - Add product to cart - user
 * - Reduce product quantity by one - user
 * - increase product quantity by one - user
 * - get cart - user
 * - delete cart - user
 * - delete cart item - user
 */

export const createUserCart = async (req, res, next) => {
  new successRes({
    type: "CREATED",
    metadata: await cartService.createUserCart({
      userId: req.clientInfo.userId,
      product: req.body,
    }),
  }).send(res);
};

export const addToCart = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await cartService.addToCart({
      userId: req.clientInfo.userId,
      product: req.body,
    }),
  }).send(res);
};

export const updateCartItem = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await cartService.addToCartV2({
      userId: req.clientInfo.userId,
      shop_order_ids: req.body,
    }),
  }).send(res);
};
export const deleteCartItem = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await cartService.deleteCartItem({
      userId: req.clientInfo.userId,
      productId: req.params.productId,
    }),
  }).send(res);
};
export const getUserCart = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await cartService.getUserCart({
      userId: req.clientInfo.userId,
    }),
  }).send(res);
};
