import * as accessService from "../services/access.service";
import successRes from "~/core/success.response";
export const signup = async (req, res, next) => {
  new successRes({
    type: "CREATED",
    metadata: await accessService.signup(req.body),
  }).send(res, { name: "header" });
};
export const login = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await accessService.login(req.body),
  }).send(res);
};

export const logout = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await accessService.logout({ tokenId: req.sKey }),
  }).send(res);
};

export const handleXrfToken = async (req, res, next) => {
  new successRes({
    type: "OK",
    metadata: await accessService.handleXrfToken({
      keyStore: req.keyStore,
      clientInfo: req.clientInfo,
    }),
  }).send(res);
};
