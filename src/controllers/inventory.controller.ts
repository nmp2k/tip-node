import successRes from "~/core/success.response";
import * as invService from "../services/inventory.service";
export const addStock = async (req, res, next) => {
  new successRes({
    type: "OK",
    message: `successfully add ${req.body.quantity} product to ${req.params.id} inventory`,
    metadata: await invService.addStock({
      shopId: req.clientInfo.userId,
      inventoryId: req.params.id,
      quantity: req.body.quantity,
    }),
  }).send(res);
};
export const reduceStock = async (req, res, next) => {
  new successRes({
    type: "OK",
    message: `successfully reduce ${req.body.quantity} product to ${req.params.id} inventory`,
    metadata: await invService.reduceStock({
      shopId: req.clientInfo.userId,
      inventoryId: req.params.id,
      quantity: req.body.quantity,
    }),
  }).send(res);
};

export const updateStock = async (req, res, next) => {
  new successRes({
    type: "OK",
    message: `successfully update stock = ${req.body.quantity} product to ${req.params.id} inventory`,
    metadata: await invService.setStock({
      shopId: req.clientInfo.userId,
      inventoryId: req.params.id,
      quantity: req.body.quantity,
    }),
  }).send(res);
};
