import { IProductModel } from "mModel";
import errorRes from "~/core/error.response";
import * as _query from "~/models/repositories/product.repo";
import * as _invQuery from "~/models/repositories/inventory.repo";
import ProductFactory from "~/factories/product_factory";
import projectionTransform from "~/utils/projection.transform";

export const createProduct = async (payload) => {
  const _model = ProductFactory._typeRegistry[payload.product_type];
  if (!_model) throw new errorRes("BAD_REQUEST", "Invalid product type");
  const _newProduct = await new ProductFactory(payload).createProduct(_model);
  _invQuery.insertInventory({
    inventory_product_id: _newProduct._id,
    inventory_shop_id: _newProduct.product_shop,
    inventory_stock: _newProduct.product_quantity,
  });
  return _newProduct;
};
// update
export const publishStateOne = async ({ shopId, productId, publish }) => {
  return await _query.publishStateProduct({ shopId, productId, publish });
};
// partial update
export const partialUpdate = async (payload: Partial<IProductModel>) => {
  const _model = ProductFactory._typeRegistry[payload.product_type];
  if (!_model) throw new errorRes("BAD_REQUEST", "Invalid product type");
  return new ProductFactory(payload).updateProduct(_model);
};
// query

//user query
export const searchProductByUser = async ({ keySearch }) => {
  return await _query.searchProductByUser({ keySearch });
};
export const findProductById = async ({
  productId,
  selectFields,
  unSelectFields = ["__v"],
}: {
  productId: string;
  selectFields?: Array<keyof IProductModel>;
  unSelectFields?: Array<keyof IProductModel>;
}) => {
  const projection = projectionTransform({
    select: selectFields,
    unselect: unSelectFields,
  });
  return await _query.findProductById({
    productId,
    projection,
  });
};
export const findAllProductForUser = async ({
  page = 0,
  limit = 50,
  sortBy,
  selectFields = ["product_name", "product_thumb", "product_price"],
  unSelectFields,
}: {
  page?: number;
  limit?: number;
  sortBy?: Array<keyof IProductModel>;
  selectFields?: Array<keyof IProductModel>;
  unSelectFields?: Array<keyof IProductModel>;
}) => {
  const query = { isPublish: true };
  const skip = page * limit;
  const projection = projectionTransform({
    select: selectFields,
    unselect: unSelectFields,
  });
  const _sortBy = sortBy
    ? Object.fromEntries(sortBy.map((ele) => [ele, 1]))
    : null;
  return await _query.findAllProducts({
    query,
    skip,
    limit,
    projection,
    sortBy: _sortBy,
  });
};
export const findAllProductForShop = async ({
  shopId,
  skip = 0,
  limit = 50,
  isPublish = false,
}) => {
  let query = {
    product_shop: shopId,
  } as any;
  isPublish ? (query.isPublish = true) : (query.isDraft = true);
  return await _query.findAllProducts({ query, skip, limit });
};
