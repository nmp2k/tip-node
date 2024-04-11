import cartModel from "../cart.model";
import objectIdTransform from "~/utils/objectId.transform";

export const findCartById = async (cartId) => {
  return await cartModel
    .findOne({
      _id: objectIdTransform(cartId),
      cart_state: "active",
    })
    .lean();
};
export const deleteCartItem = async ({ userId, productId }) => {
  const query = { cart_user_id: userId, cart_state: "active" };
  const updateSet = {
    $pull: {
      cart_products: {
        productId,
      },
    },
  };
  return await cartModel.updateOne(query, updateSet).lean().exec();
};
