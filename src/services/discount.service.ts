import { IDiscountModel } from "mModel";
import discountModel from "~/models/discount.model";
import * as discountRepo from "~/models/repositories/discount.repo";
import { findAllProducts } from "~/models/repositories/product.repo";
import errorRes from "~/core/error.response";
export const createDiscount = async (input: Partial<IDiscountModel>) => {
  const _shopId = input.discount_shop_id;
  const _productIds = input.discount_product_ids;
  const _discountCode = input.discount_code;
  let discountMaxUsesPerUser = input.discount_max_uses_per_user;
  if (!discountMaxUsesPerUser) discountMaxUsesPerUser = 99999;
  const isDiscountExist = await discountRepo.getOneDiscount({
    shopId: _shopId,
    discountCode: _discountCode,
  });
  if (isDiscountExist)
    throw new errorRes("BAD_REQUEST", "Discount code already exist");

  if (_productIds.length > 0) {
    await discountRepo.validProductIds({
      productIds: _productIds,
      shopId: _shopId,
    });
  }
  return await discountModel.create({
    ...input,
    discount_max_uses_per_user: discountMaxUsesPerUser,
  });
};
export const updateDiscount = async ({ discountId, shopId, updateInfo }) => {
  const _productIds = updateInfo?.discount_product_ids;
  const isDiscountExist = discountRepo.getOneDiscount({
    shopId,
    discountId,
  });
  if (!isDiscountExist)
    throw new errorRes("BAD_REQUEST", "Discount code not exist");
  if (_productIds.length > 0) {
    await discountRepo.validProductIds({
      productIds: _productIds,
      shopId,
    });
  }
  const _query = { _id: discountId, discount_shop_id: shopId };
  const _update = updateInfo;
  const _opts = { lean: true };
  return await discountModel.findOneAndUpdate(_query, _update, _opts);
};
export const getAllProductsWithDiscount = async ({
  discountCode,
  shopId,
  limit,
  page,
}) => {
  const foundedDiscount = await discountRepo.getOneDiscount({
    discountCode,
    shopId,
  });
  if (!foundedDiscount.discount_is_active)
    throw new errorRes("BAD_REQUEST", "Discount code inactive");
  const discountSpecific = foundedDiscount?.discount_applies_to;
  if (discountSpecific === "all") {
    const _query = {
      discount_shop_id: shopId,
      isPublish: true,
    };
    const skip = limit * (page - 1);
    return await findAllProducts({ query: _query, limit, skip });
  }
  if (discountSpecific === "specific") {
    const _query = {
      discount_shop_id: shopId,
      isPublish: true,
      _id: { $in: foundedDiscount.discount_product_ids },
    };
    const skip = limit * (page - 1);
    return await findAllProducts({ query: _query, limit, skip });
  }
};
export const getAllDiscountsByShop = async ({ shopId, limit, page }) => {
  const _query = {
    discount_shop_id: shopId,
    isPublish: true,
  };
  const skip = limit * (page - 1);
  return await discountModel.find(_query).skip(skip).limit(limit).lean().exec();
};
export const deleteDiscount = async ({ shopId, discountId }) => {
  const _query = { _id: discountId, discount_shop_id: shopId };
  return await discountModel.findOneAndDelete(_query).exec();
};
