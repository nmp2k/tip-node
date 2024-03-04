import jwt from "jsonwebtoken";
export const createTokensPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });
    const refreshToken = await jwt.sign(payload, privateKey, {
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