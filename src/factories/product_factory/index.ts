import ProductFactory from "./product.factory";
import * as PT from "~/models/product_types";
ProductFactory._typeRegister(PT.productType.clothing, PT.clothingProduct);
ProductFactory._typeRegister(PT.productType.electronic, PT.electronicProduct);
ProductFactory._typeRegister(PT.productType.furniture, PT.furnitureProduct);
export default ProductFactory;
