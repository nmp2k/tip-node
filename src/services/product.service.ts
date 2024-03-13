import { IProductModel } from "mModel";
import errorRes from "~/core/error.response";
import * as PT from "~/models/product_types";
import * as _query from "~/models/repositories/product.repo";
import product from "~/models/product.model";
class ProductFactory {
  static _typeRegistry = {};
  static _typeRegister(type, model) {
    ProductFactory._typeRegistry[type] = model;
  }
  static async createProduct(payload) {
    const _model = ProductFactory._typeRegistry[payload.product_type];
    if (!_model) throw new errorRes("BAD_REQUEST", "Invalid product type");
    return new Product(payload).createProduct(_model);
  }
  // update
  static async publishStateOne({ shopId, productId, publish }) {
    return await _query.publishStateProduct({ shopId, productId, publish });
  }
  // query
  static async findAllProductForShop({
    shopId,
    skip = 0,
    limit = 50,
    isPublish = false,
  }) {
    let query = {
      product_shop: shopId,
    } as any;
    isPublish ? (query.isPublish = true) : (query.isDraft = true);
    return await _query.findAllProductForShop({ query, skip, limit });
  }
}
class Product {
  public product_name: string;
  public product_thumb: string;
  public product_description?: string;
  public product_price: number;
  public product_quantity: number;
  public product_type: string;
  public product_shop: string; // Replace with actual type for ObjectId
  public product_attributes: any;
  constructor(input: IProductModel) {
    this.product_name = input.product_name;
    this.product_thumb = input.product_thumb;
    this.product_description = input.product_description;
    this.product_price = input.product_price;
    this.product_quantity = input.product_quantity;
    this.product_type = input.product_type;
    this.product_shop = input.product_shop;
    this.product_attributes = input.product_attributes;
  }

  async createProduct(_typeModel) {
    const newSub = await _typeModel.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newSub) {
      throw new errorRes(
        "BAD_REQUEST",
        `${this.product_type} product not created`
      );
    }
    const newProduct = await product.create({ _id: newSub._id, ...this });
    if (!newProduct) {
      throw new errorRes("BAD_REQUEST", "product not created");
    }
    return newProduct;
  }
}
ProductFactory._typeRegister(PT.productType.clothing, PT.clothingProduct);
ProductFactory._typeRegister(PT.productType.electronic, PT.electronicProduct);
ProductFactory._typeRegister(PT.productType.furniture, PT.furnitureProduct);
export default ProductFactory;
