import findById from "~/services/apiKey.service";
import { cRequestHandler } from "~/types";
const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

export const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    console.log("step 1", key);
    if (!key) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }
    const objKey = await findById(key);
    console.log("tesp 2", objKey);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }
    req.objKey = objKey;
    next();
  } catch (e) {}
};

export const permission = (per) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "permission denied",
      });
    }
    console.log(req.objKey.permissions);
    if (!req.objKey.permissions.includes(per)) {
      return res.status(403).json({
        message: "permission denied",
      });
    }
    next();
  };
};
