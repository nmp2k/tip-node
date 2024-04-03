import * as service from "../services/discount.service";
import successRes from "~/core/success.response";
export const createDiscount = async (req, res, next) => {
  new successRes({
    type: "CREATED",
    metadata: await service.createDiscount({
      discount_shop_id: req.clientInfo.userId,
      ...req.body,
    }),
  }).send(res);
};
export const updateDiscount = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await service.updateDiscount({
      discountId: req.params.discountId,
      shopId: req.clientInfo.userId,
      updateInfo: req.body,
    }),
  }).send(res);
};

export const getAllProductsWithDiscount = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await service.getAllProductsWithDiscount({
      discountCode: req.params.discountCode,
      shopId: req.body.shopId,
      limit: req.query.limit,
      page: req.query.page,
    }),
  }).send(res);
};

export const getAllDiscountsByShop = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await service.getAllDiscountsByShop({
      shopId: req.clientInfo.userId,
      limit: req.query.limit,
      page: req.query.page,
    }),
  }).send(res);
};
export const deleteDiscount = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await service.deleteDiscount({
      shopId: req.clientInfo.userId,
      discountId: req.params.discountId,
    }),
  }).send(res);
};
