import errorRes from "~/core/error.response";
import { IProductModel } from "mModel";
import projectionTransform from "~/utils/projection.transform";
import productModel from "../product.model";
import * as PT from "../product_types";
import _ from "lodash";
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
//user query
export const searchProductByUser = async ({ keySearch }) => {
  const regexString = `/${keySearch}/i`;
  const query = {
    $text: { $search: regexString },
    isPublish: true,
  };
  const options = {
    sort: { score: { $meta: "textScore" } },
    lean: true,
  };

  return productModel.find(query, null, options).exec();
};
export const findProductById = async ({
  productId,
  projection = null,
  isPublish,
}: {
  productId: string;
  projection?: { select?: string[]; unselect?: string[] };
  isPublish?: boolean;
}) => {
  const options = {
    populate: [{ path: "product_shop", select: "name" }],
    lean: true,
  };
  const _projection = projectionTransform(projection);
  try {
    return await productModel
      .findOne({ _id: productId, isPublish }, _projection, options)
      .exec();
  } catch (e) {
    throw new errorRes("NOT_FOUND", "can't find product");
  }
};
/**
 * Finds all products based on provided query parameters.
 *
 * @param {object} query - The query parameters to filter products
 * @param {number} skip - Number of products to skip
 * @param {number} limit - Maximum number of products to return
 * @param {object} projection - The fields to include or exclude
 * @param {string} sortBy - The field to sort the products by
 * @return {Promise} A promise that resolves to an array of products
 */
export const findAllProducts = async ({
  query,
  skip = 0,
  limit = 50,
  projection = {},
  sortBy = { _id: 1 },
}: {
  query: any;
  skip: number;
  limit: number;
  projection?: any;
  sortBy?: object;
}) => {
  const populate = [{ path: "product_shop", select: "name -_id" }];
  const options = {
    skip: skip,
    limit: limit,
    populate: populate,
    sort: sortBy,
    lean: true,
  };
  return productModel.find(query, projection, options).exec();
};
