import keyTokenModel from "../models/keyToken.model";
import { Types } from "mongoose";
export const createToken = async ({ userId, publicKey, refreshToken }) => {
  const filter = { user: userId };
  const update = {
    publicKey,
    refreshToken,
    refreshTokensUsed: [],
  };
  const options = {
    upsert: true,
    new: true,
  };
  const tokens = await keyTokenModel
    .findOneAndUpdate(filter, update, options)
    .lean();
  return tokens ? tokens : null;
};

export const findByUserId = async (userId) => {
  return await keyTokenModel.findOne({ user: userId }).lean();
};

export const removeTokenId = async (tokenId) => {
  return await keyTokenModel.deleteOne({ _id: tokenId });
};
