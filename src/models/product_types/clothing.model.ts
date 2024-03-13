import { Schema, model } from "mongoose";
const DOCUMENT_NAME = "Clothing";
const COLLECTION_NAME = "Clothes";

const _schema = new Schema(
  {
    brand: {
      type: String,
      require: true,
    },
    size: {
      type: String,
    },
    material: {
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
