import inventoryModel from "../inventory.model";
import { IInventoryModel } from "mModel";
import errorRes from "~/core/error.response";
import objectIdTransform from "~/utils/objectId.transform";
export const getOneInventory = async ({ productId, shopId }) => {
  const _filter = {
    inventory_product_id: productId,
    inventory_shop_id: objectIdTransform(shopId),
  };
  const _projection = {
    _id: 1,
  };
  const _opts = { lean: true };
  return await inventoryModel.findOne(_filter, _projection, _opts).exec();
};
export const insertInventory = async (args: Partial<IInventoryModel>) => {
  return await inventoryModel.create(args);
};

export const inventoryUpdateById = async ({
  inventoryId,
  shopId,
  updateInfo,
}) => {
  const _query = { _id: inventoryId, inventory_shop_id: shopId };
  const _update = updateInfo;
  const opts = { lean: true };
  inventoryModel.findOneAndUpdate(_query, _update, opts).exec();
};

export const addStock = async ({ shopId, inventoryId, quantity }) => {
  const _query = { _id: inventoryId, inventory_shop_id: shopId };
  const _update = { $inc: { inventory_stock: quantity } };
  const opts = { lean: true };
  const _res = await inventoryModel
    .findOneAndUpdate(_query, _update, opts)
    .exec();
};
export const setStock = async ({ shopId, inventoryId, quantity }) => {
  const _query = { _id: inventoryId, inventory_shop_id: shopId };
  const _update = { $set: { inventory_stock: quantity } };
  const opts = { lean: true };
  const _res = await inventoryModel
    .findOneAndUpdate(_query, _update, opts)
    .exec();
};
