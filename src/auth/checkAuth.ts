import errorRes from "~/core/error.response";
import findById from "~/services/apiKey.service";
const HEADER = {
  API_KEY: "x-api-key",
  USER_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

export const apiKey = async (req, res, next) => {
  const key = req.headers[HEADER.API_KEY]?.toString();
  if (!key) {
    throw new errorRes("FORBIDDEN", "api key not exist");
  }
  const objKey = await findById(key);
  if (!objKey) {
    throw new errorRes("FORBIDDEN", "api key not found");
  }
  req.objKey = objKey;
  return next();
};

export const permission = (per) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      throw new errorRes("FORBIDDEN", "permission denied");
    }
    console.log(req.objKey.permissions);
    if (!req.objKey.permissions.includes(per)) {
      throw new errorRes("BAD_REQUEST", "permission denied");
    }
    return next();
  };
};

// export const asyncErrorHandler = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };
