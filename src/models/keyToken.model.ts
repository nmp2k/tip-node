import { Schema, model } from "mongoose";
import { IKeyTokenModel } from "mModel";
const COLLECTION_NAME = "Keys";
const DOCUMENT_NAME = "Key";
const keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Shop",
    },
    publicKey: {
      type: String,
      require: true,
    },
    privateKey: {
      type: String,
      require: true,
    },
    refreshToken: {
      type: String,
    },
    refreshTokensUsed: {
      type: Array,
      default: [],
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export default model<IKeyTokenModel>(DOCUMENT_NAME, keyTokenSchema);
