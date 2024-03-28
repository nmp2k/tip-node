import shopModel from "~/models/shop.model";

export const findByEmail = async ({
  email,
  select = { email: 1, name: 1, password: 1, status: 1, roles: 1 },
}) => {
  return await shopModel.findOne({ email }).select(select).lean();
};
