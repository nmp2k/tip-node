import discountModel from "../discount.model";
import projectionTransform from "~/utils/projection.transform";
import { getOneInventory } from "./inventory.repo";
import errorRes from "~/core/error.response";
/**
 * Retrieves a discount by the provided parameters.
 *
 * @param {string} discountId - The ID of the discount to retrieve.
 * @param {string} shopId - The ID of the shop associated with the discount.
 * @param {string} discountCode - The code of the discount.
 * @return {Promise<any>} A Promise that resolves to the discount object.
 */
export const getOneDiscount = async ({
  discountId,
  shopId,
  discountCode,
}: {
  discountId?: string;
  shopId?: string;
  discountCode?: string;
}) => {
  const _filter = {
    _id: discountId,
    discount_shop_id: shopId,
    discount_code: discountCode,
  };
  const _opts = { lean: true };
  return await discountModel.findOne(_filter, null, _opts).exec();
};
export const validProductIds = async ({ productIds, shopId }) => {
  const validateList = productIds.map(async (id) => {
    return getOneInventory({ shopId, productId: id });
  });
  try {
    await Promise.all(validateList);
  } catch {
    throw new errorRes("BAD_REQUEST", "invalid product id");
  }
};

export const applyDiscount = async () => {};

export const cancelDiscount = async () => {};
