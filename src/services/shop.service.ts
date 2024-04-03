import shopModel from "~/models/shop.model";
import projectionTransform from "~/utils/projection.transform";

export const findByEmail = async ({
  email,
  select = ["email", "name", "password", "status", "roles"],
  unselect = [],
}) => {
  const _query = { email };
  const _projection = projectionTransform({ select, unselect });
  const _options = { lean: true };
  return await shopModel.findOne(_query, _projection, _options).exec();
};
