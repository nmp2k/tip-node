import * as _query from "~/models/repositories/inventory.repo";

export const addStock = async ({ shopId, inventoryId, quantity }) => {
  return await _query.addStock({ shopId, inventoryId, quantity });
};
export const reduceStock = async ({ shopId, inventoryId, quantity }) => {
  return await _query.addStock({ shopId, inventoryId, quantity: -quantity });
};
export const setStock = async ({ shopId, inventoryId, quantity }) => {
  return await _query.setStock({ shopId, inventoryId, quantity });
};
