import { ICartModel } from "mModel";
import errorRes from "~/core/error.response";
import { getOneInventory } from "~/models/repositories/inventory.repo";
export const createUserCart = async (req, res, next) => {
  try {
    const product: ICartModel["cart_products"][number] = req.body;
    const { quantity, shopId, productId } = product;
    //call user repo if user id invalid return error
    if (!quantity && !shopId && productId)
      throw new errorRes("UNPROCESSABLE_ENTITY", "Invalid payload");
    await getOneInventory({ productId, shopId });
    next();
  } catch (e) {
    next(e);
  }
};
