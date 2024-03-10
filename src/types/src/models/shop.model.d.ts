declare module "mModel" {
  export interface IShopModel {
    name: string;
    verify: boolean;
    email: string;
    status: "active" | "inactive";
    password: string;
    roles: string[];
  }
}
