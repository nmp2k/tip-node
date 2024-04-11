import successRes from "~/core/success.response";
import * as orderService from "~/services/order.service";
export const createOrder = async (req, res) => {
  new successRes({
    type: "OK",
    message: `successfully created order by user ${req.params.userId}`,
    metadata: await orderService.placedOrderByUser({
      userId: req.params.userId,
      ...req.body,
    }),
  }).send(res);
};

export const getOne = async (req, res) => {
  new successRes({
    type: "OK",
    message: `successfully get order by user ${req.body.userId}`,
    metadata: await orderService.getOneOrderByUser({
      userId: req?.client?.userId,
      orderId: req.params.id,
    }),
  }).send(res);
};
