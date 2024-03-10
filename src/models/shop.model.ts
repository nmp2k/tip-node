import { model, Schema } from "mongoose";
import { ShopDocument } from "mShopModel";
// Declare the Schema of the Mongo model
const COLLECTION_NAME = "Shops";
const DOCUMENT_NAME = "Shop";
const shopSchema = new Schema<ShopDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    } as unknown as Array<string>,
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
export default model(DOCUMENT_NAME, shopSchema);
