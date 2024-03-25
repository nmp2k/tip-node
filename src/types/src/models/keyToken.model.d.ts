declare module "mModel" {
  import { Document } from "mongoose";
  export interface IKeyTokenModel extends Document {
    user: string;
    publicKey: string;
    privateKey: string;
    refreshToken: string;
    refreshTokensUsed: string[];
  }
}
