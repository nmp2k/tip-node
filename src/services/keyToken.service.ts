import keyTokenModel from "../models/keyToken.model.js";
export const createToken = async ({ userId, publicKey }) => {
  try {
    const tokens = await keyTokenModel.create({
      user: userId,
      publicKey,
    });
    return tokens ? tokens.publicKey : null;
  } catch (e) {
    return e;
  }
};