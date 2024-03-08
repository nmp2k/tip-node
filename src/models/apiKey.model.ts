import { model, Schema } from "mongoose";
const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

/**
 * The ApiKey schema.
 */
const ApiKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ["0000", "1111", "2222"],
      default: ["0000"],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default model(DOCUMENT_NAME, ApiKeySchema);
