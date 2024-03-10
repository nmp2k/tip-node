import jwt from "jsonwebtoken";
import errorRes from "~/core/error.response";
import { asyncErrorHandler } from "~/utils/asyncError.handler";
import { findByUserId } from "~/services/keyToken.service";
const HEADER = {
  API_KEY: "x-api-key",
  USER_ID: "x-client-id",
  AUTHORIZATION: "authorization",
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
   * check missing client id
   * get accessToken
   * verify accessToken
   * check user legit
   * valid user info sync with keystore
   */
  const userId = req.headers[HEADER.USER_ID];
  if (!userId) {
    throw new errorRes("UNAUTHORIZED");
  }
  const keystore = await findByUserId(userId);
  if (!keystore) {
    throw new errorRes("UNAUTHORIZED", "client keystore not found");
  }
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) {
    throw new errorRes("UNAUTHORIZED", "access token not found");
  }
  try {
    const decode = jwt.verify(accessToken, keystore.publicKey);
    if (typeof decode !== "string" && "userId" in decode) {
      // narrowing type
      if (userId !== decode.userId) {
        throw new errorRes("UNAUTHORIZED", "invalid user");
      }
      req.sKey = keystore._id;
      next();
    }
  } catch (e) {
    throw e;
  }
});
