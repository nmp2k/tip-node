declare module "mModel" {
  import { Document } from "mongoose";
  export interface IShopModel extends Document {
    name: string;
    verify: boolean;
    email: string;
    status: "active" | "inactive";
    password: string;
    roles: string[];
  }
}
