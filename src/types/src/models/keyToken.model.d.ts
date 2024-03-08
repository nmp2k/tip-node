import { Schema } from "mongoose";
declare const _default: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    refreshToken: any[];
    user?: import("mongoose").Types.ObjectId;
    publicKey?: string;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    refreshToken: any[];
    user?: import("mongoose").Types.ObjectId;
    publicKey?: string;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    refreshToken: any[];
    user?: import("mongoose").Types.ObjectId;
    publicKey?: string;
} & {
    _id: import("mongoose").Types.ObjectId;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    collection: string;
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    refreshToken: any[];
    user?: import("mongoose").Types.ObjectId;
    publicKey?: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    refreshToken: any[];
    user?: import("mongoose").Types.ObjectId;
    publicKey?: string;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    refreshToken: any[];
    user?: import("mongoose").Types.ObjectId;
    publicKey?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>>;
export default _default;