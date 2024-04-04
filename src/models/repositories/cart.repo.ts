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
