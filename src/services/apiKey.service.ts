import apiKeyModel from "~/models/apiKey.model";
const findById = async (key: string) => {
  return await apiKeyModel.findOne({ key, status: true }).lean();
};

export default findById;
