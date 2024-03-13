import shopModel from "~/models/shop.model";
import * as keyTokenService from "./keyToken.service";
import { createTokensPair } from "~/auth/authUtils";
import { getInfo } from "~/utils";
import errorRes from "~/core/error.response";
import { findByEmail } from "./shop.service";
import { createRsaPairs, hashPass } from "~/helpers/encode";
import keyTokenModel from "~/models/keyToken.model";
// type import
const shopRoles = {
  SHOP: 1,
  ADMIN: 2,
  WRITER: 3,
  EDITOR: 4,
};
//shop login
export const login = async ({ email, password, refreshToken = null }) => {
  // hash function mutate origin,
  //  assign for prevent deep digest caching header
  const foundShop = await findByEmail({ email });
  if (!foundShop) {
    throw new errorRes("BAD_REQUEST", "email not found");
  }
  const matchPass = hashPass(password) === foundShop.password;
  if (!matchPass) {
    throw new errorRes("BAD_REQUEST", "password not match");
  }
  const { privateKey, publicKey } = createRsaPairs();
  const tokens = await createTokensPair(
    { userId: foundShop._id, email: foundShop.email },
    publicKey,
    privateKey
  );
  // write user authentications record
  const keyToken = await keyTokenService.createToken({
    userId: foundShop._id,
    publicKey,
    privateKey,
    refreshToken: tokens.refreshToken,
  });
  return {
    shop: getInfo({ fields: ["_id", "name", "email"], obj: foundShop }),
    access: keyToken,
  };
};

// shop signup
export const signup = async ({ name, email, password }) => {
  // check email exists
  //learn return js object not mongoose object, faster for using
  const holderShop = await shopModel.findOne({ email }).lean();
  if (holderShop) {
    throw new errorRes("BAD_REQUEST", "email already exists");
  }
  const newShop = await shopModel.create({
    name,
    email,
    password: hashPass(password),
    roles: [shopRoles.ADMIN],
  });
  if (!newShop) {
    return null;
  }
  // create rsa pairs for generate authentication token pairs
  const { privateKey, publicKey } = createRsaPairs();
  // create tokens pairs
  const tokens = await createTokensPair(
    { userId: newShop._id, email: newShop.email },
    publicKey,
    privateKey
  );
  // write user authentications record
  const keyToken = await keyTokenService.createToken({
    userId: newShop._id,
    publicKey,
    privateKey,
    refreshToken: tokens.refreshToken,
  });
  if (!keyToken) {
    throw new errorRes("BAD_REQUEST", "key token not created");
  }
  // done process return value for controller handler
  return {
    shop: getInfo({ fields: ["_id", "name", "email"], obj: newShop }),
    access: keyToken,
  };
};

export const logout = async ({ tokenId }) => {
  const removedKey = await keyTokenService.removeTokenId(tokenId);
  return removedKey;
};
export const handleXrfToken = async ({ keyStore, clientInfo }) => {
  const newTokens = await createTokensPair(
    { userId: clientInfo.userId, email: clientInfo.email },
    keyStore.publicKey,
    keyStore.privateKey
  );
  const filter = { _id: keyStore._id };
  const update = {
    refreshToken: newTokens.refreshToken,
    refreshTokensUsed: [...keyStore.refreshTokensUsed, keyStore.refreshToken],
  };
  const options = {
    upsert: false,
    new: true,
  };
  const tokens = await keyTokenModel
    .findOneAndUpdate(filter, update, options)
    .lean();
  return {
    authorization: tokens.refreshToken,
    rfToken: newTokens.refreshToken,
  };
};
