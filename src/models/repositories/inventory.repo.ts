import inventoryModel from "../inventory.model";
import { IInventoryModel } from "mModel";
export const insertInventory = async (args: Partial<IInventoryModel>) => {
  return await inventoryModel.create(args);
};
