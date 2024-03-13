import productService from "../services/product.service";
import successRes from "~/core/success.response";
export const createProduct = async (req, res, next) => {
  new successRes({
    type: "CREATED",
    metadata: await productService.createProduct({
      ...req.body,
      product_shop: req.clientInfo.userId,
    }),
  }).send(res);
};
// update
export const publishOne = async (req, res, next) => {
  new successRes({
    type: "OK",
    message: `successfully product published`,
    metadata: await productService.publishStateOne({
      shopId: req.clientInfo.userId,
      productId: req.params.id,
      publish: true,
    }),
  }).send(res);
};
export const unPublishOne = async (req, res, next) => {
  new successRes({
    type: "OK",
    message: `successfully unpublish product `,
    metadata: await productService.publishStateOne({
      shopId: req.clientInfo.userId,
      productId: req.params.id,
      publish: false,
    }),
  }).send(res);
};
//query
export const searchProductByUser = async (req, res, next) => {
  new successRes({
    type: "OK",
    message: `successfully searching`,
    metadata: await productService.searchProductByUser({
      keySearch: req.params.keySearch,
    }),
  }).send(res);
};
export const getAllDraftProduct = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await productService.findAllProductForShop({
      shopId: req.clientInfo.userId,
    }),
  }).send(res);
};
export const getAllPublishProduct = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await productService.findAllProductForShop({
      shopId: req.clientInfo.userId,
      isPublish: true,
    }),
  }).send(res);
};
