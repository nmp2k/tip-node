import { createHash, generateKeyPairSync, createPublicKey } from "crypto";
import shopModel from "../models/shop.model.js";
import keyTokenService from "./keyToken.service.js";
import authUtils from "../auth/authUtils.js";
import { getInfo } from "../utils/index.js";
const hash = createHash("sha256");
const accessService = {};
const shopRoles = {
  SHOP: 1,
  ADMIN: 2,
  WRITER: 3,
  EDITOR: 4,
};
accessService.signup = async ({ name, email, password }) => {
  try {
    // check email exists
    //learn return js object not mongoose object, faster for using
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      return {
        code: "",
        message: "Email already exists",
        status: "error",
      };
    }
    const passHash = hash.update(password).digest("hex");
    const newShop = await shopModel.create({
      name,
      email,
      password: passHash,
      roles: [shopRoles.ADMIN],
    });
    if (newShop) {
      const { privateKey, publicKey } = generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });
      const publicKeyString = await keyTokenService.createToken({
        userId: newShop._id,
        publicKey,
      });
      if (!publicKeyString) {
        return {
          code: "",
          message: "publicKeyString not created",
        };
      }
      const tokens = await authUtils.createTokensPair(
        { userId: newShop._id, email },
        publicKeyString,
        privateKey
      );
      return {
        code: "201",
        metadata: {
          shop: getInfo({ fields: ["_id", "name", "email"], obj: newShop }),
          tokens,
        },
      };
    }
    return {
      code: "200",
      metadata: null,
    };
  } catch (e) {
    return {
      code: "",
      message: e.message,
      status: "error",
    };
  }
};
export default accessService;
