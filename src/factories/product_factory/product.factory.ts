import { flattenObject } from "~/utils";
import errorRes from "~/core/error.response";
import product from "~/models/product.model";
class ProductFactory {
  static _typeRegistry = {};
  static _typeRegister(type, model) {
    ProductFactory._typeRegistry[type] = model;
  }
  public product_name: string;
  public product_thumb: string;
  public product_description?: string;
  public product_price: number;
  public product_quantity: number;
  public product_type: string;
  public product_shop: string; // Replace with actual type for ObjectId
  public product_attributes: any;
  public _id: any;
  constructor(input) {
    this.product_name = input.product_name;
    this.product_thumb = input.product_thumb;
    this.product_description = input.product_description;
    this.product_price = input.product_price;
    this.product_quantity = input.product_quantity;
    this.product_type = input.product_type;
    this.product_shop = input.product_shop;
    this.product_attributes = input.product_attributes;
    this._id = input.productId;
  }

  async updateProduct(_typeModel) {
    const subProductPayload = this.product_attributes;
    if (subProductPayload) {
      const _preUpdate = flattenObject(subProductPayload);
      const query = { product_shop: this.product_shop, _id: this._id };
      const options = { new: true, lean: true };
      const newSub = await _typeModel.findOneAndUpdate(
        query,
        _preUpdate,
        options
      );
      if (!newSub) {
        throw new errorRes(
          "BAD_REQUEST",
          `${this.product_type} product not updated`
        );
      }
    }
    const _mainProduct = flattenObject(this);
    const query = { product_shop: this.product_shop, _id: this._id };
    const options = { new: true, lean: true };
    const _mainUpdated = await product.findOneAndUpdate(
      query,
      _mainProduct,
      options
    );
    if (!_mainUpdated) {
      throw new errorRes("BAD_REQUEST", `product not updated`);
    }
    return _mainUpdated;
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

export default ProductFactory;
