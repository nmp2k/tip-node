import { Schema, model } from "mongoose";
const DOCUMENT_NAME = "Electronic";
const COLLECTION_NAME = "Electronics";

const _schema = new Schema(
  {
    manufacture: {
      type: String,
      require: true,
    },
    model: {
      type: String,
    },
    color: {
      type: String,
    },
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export default model(DOCUMENT_NAME, _schema);
