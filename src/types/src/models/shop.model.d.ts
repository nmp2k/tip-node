declare module "ShopModel" {
    import { Document} from "mongoose";
    interface Shop {
    name: string;
    verify: boolean;
    email: string;
    status: "active" | "inactive";
    password: string;
    roles: string[];
}

export interface ShopDocument extends Shop, Document {
    createdAt: Date;
    updatedAt: Date;
}
}
