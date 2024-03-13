import errorRes from "~/core/error.response";
import productModel from "../product.model";
import * as PT from "../product_types";
//update
export const publishStateProduct = async ({ shopId, productId, publish }) => {
  const query = {
    _id: productId,
    product_shop: shopId,
  };
  let update = {
    isDraft: false,
    isPublish: true,
  };
  if (publish === false) {
    update.isDraft = true;
    update.isPublish = false;
  }
  const { matchedCount, modifiedCount } = await productModel.updateOne(
    query,
    update
  );
  if (!matchedCount) {
    return new errorRes(
      "NOT_FOUND",
      "can't find product for change publish state"
    );
  }
  return modifiedCount;
};
//query

export const findAllProductForShop = async ({ query, skip, limit }) => {
  return productModel
    .find(query)
    .populate("product_shop", "name email -_id")
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
};
