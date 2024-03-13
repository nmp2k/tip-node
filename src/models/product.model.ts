import slug from "slugify";
import { Schema, model } from "mongoose";
import { IProductModel } from "mModel";
import { productType } from "./product_types";
const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";
const ProductSchema = new Schema(
  {
    product_name: {
      type: String,
      require: true,
    },
    product_thumb: {
      type: String,
      require: true,
    },

    product_description: {
      type: String,
    },
    product_price: {
      type: Number,
      require: true,
    },
    product_quantity: {
      type: Number,
      require: true,
    },
    product_type: {
      type: String,
      require: true,
      enum: Object.values(productType),
    },
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    product_attributes: {
      type: Schema.Types.Mixed,
      require: true,
    },
    product_slug: {
      type: String,
    },
    product_ratingAverage: {
      type: Number,
      default: 4.5,
      //custom error message
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be lower 5.0"],
      //custom setter
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: {
      type: Array,
      default: [],
    },
    isDraft: {
      type: Boolean,
      default: true,
      index: true,
      select: false,
    },
    isPublish: {
      type: Boolean,
      default: false,
      index: true,
      select: false,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
ProductSchema.pre("save", function (next) {
  this.product_slug = slug(this.product_name);
  return next();
});
export default model<IProductModel>(DOCUMENT_NAME, ProductSchema);
