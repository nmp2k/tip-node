import { Request, NextFunction, Response } from "express";
declare interface cRequestHandler<
  reqProps = unknown,
  Params = unknown,
  ReqBody = unknown,
  ResBody = unknown,
  ReqQuery = unknown
> {
  (
    req: Request<Params, ResBody, ReqBody, ReqQuery, Record<string, any>> &
      reqProps,
    res: Response<ResBody, Record<string, any>>,
    next: NextFunction
  ): void;
}
