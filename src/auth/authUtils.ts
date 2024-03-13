import jwt from "jsonwebtoken";
import errorRes from "~/core/error.response";
import { asyncErrorHandler } from "~/utils/asyncError.handler";
import { findByUserId } from "~/services/keyToken.service";
import keyTokenModel from "~/models/keyToken.model";
const HEADER = {
  API_KEY: "x-api-key",
  USER_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESH_TOKEN: "x-rf-token",
};
export const createTokensPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });
    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });
    jwt.verify(accessToken, publicKey, (error, decode) => {
      if (error) {
        console.log("error verify access token :", error);
      } else {
        console.log("decode access token :", decode);
      }
    });
    return {
      accessToken,
      refreshToken,
    };
  } catch (e) {
    return e;
  }
};

export const authentication = asyncErrorHandler(async (req, res, next) => {
  /**
   * aims to :
   * 1: valid refresh token
   * 2: valid access token
   * check missing client id
   * get accessToken
   * verify accessToken
   * check user legit
   * valid user info sync with keystore
   */

  // check missing client id
  const userId = req.headers[HEADER.USER_ID];
  if (!userId) {
    throw new errorRes("UNAUTHORIZED");
  }
  const keystore = await findByUserId(userId);
  if (!keystore) {
    throw new errorRes("UNAUTHORIZED", "client keystore not found");
  }
  const rfToken = req.headers[HEADER.REFRESH_TOKEN];
  if (rfToken) {
    try {
      const isUsed = keystore.refreshTokensUsed.includes(rfToken);
      if (isUsed) {
        await keyTokenModel.deleteOne(keystore._id);
        throw new errorRes("UNAUTHORIZED", "somethings wrong!");
      }
      const decode = jwt.verify(rfToken, keystore.publicKey);
      req.keyStore = keystore;
      req.clientInfo = decode;
      return next();
    } catch (e) {
      throw e;
    }
  }
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) {
    throw new errorRes("UNAUTHORIZED", "access token not found");
  }
  try {
    const decode = jwt.verify(accessToken, keystore.publicKey);
    req.sKey = keystore._id;
    req.clientInfo = decode;
    return next();
  } catch (e) {
    throw e;
  }
});
