import cartModel from "~/models/cart.model";
import { findProductById } from "~/models/repositories/product.repo";
import errorRes from "~/core/error.response";
import { ICartModel } from "mModel";

/**
 * - Add product to cart - user
 * - Reduce product quantity by one - user
 * - increase product quantity by one - user
 * - get cart - user
 * - delete cart - user
 * - delete cart item - user
 */

export const createUserCart = async (input: {
  userId: string;
  product: ICartModel["cart_products"][number];
}) => {
  const query = {
    cart_user_id: input.userId,
    cart_state: "active",
  };

  const updateOrInsert = {
      $addToSet: {
        cart_products: input.product,
      },
    },
    options = { upsert: true, new: true };

  return await cartModel.findOneAndUpdate(query, updateOrInsert, options);
};
export const updateUserCartQuantity = async ({ userId, product }) => {
  const { productId, quantity } = product;
  const query = {
      cart_user_id: userId,
      "cart_products.productId": productId,
      cart_state: "active",
    },
    updateSet = {
      $inc: {
        "cart_products.$.quantity": quantity,
      },
    },
    options = { upsert: true, new: true };
  return await cartModel.findOneAndUpdate(query, updateSet, options);
};

export const addToCart = async ({ userId, product }) => {
  const userCart = await cartModel.findOne({
    cart_user_id: userId,
  });

  if (!userCart) {
    // create cart for User
    return await createUserCart({ userId, product });
  }

  // neu co gio hang roi nhung chua co san pham nao
  if (!userCart.cart_products.length) {
    userCart.cart_products = [product];
    return await userCart.save();
  }

  // gio hang ton tai, va co san pham nay thi update quantity
  return await updateUserCartQuantity({ userId, product });
};

// update cart
/**
 * shop_order_ids: [
 *  {
 *      shopId,
 *      item_products: [
 *          {
 *              quantity,
 *              price,
 *              shopId,
 *              old_quantity,
 *              productId
 *          }
 *      ],
 *      version
 *  }
 * ]
 */
export const addToCartV2 = async ({ userId, shop_order_ids = [] }) => {
  const { productId, quantity, old_quantity } =
    shop_order_ids[0]?.item_products[0];

  // check product
  const foundProduct = await findProductById({ productId });
  if (!foundProduct) throw new errorRes("BAD_REQUEST", "Product not found");

  // compare
  if (foundProduct.product_shop.toString() !== shop_order_ids[0]?.shopId) {
    throw new errorRes("BAD_REQUEST", "Product do not belong to the shop");
  }

  if (quantity === 0) {
    return await deleteCartItem({
      userId,
      productId,
    });
  }

  return await updateUserCartQuantity({
    userId,
    product: {
      productId,
      quantity: quantity - old_quantity,
    },
  });
};

export const deleteCartItem = async ({ userId, productId }) => {
  const query = { cart_user_id: userId, cart_state: "active" };
  const updateSet = {
    $pull: {
      cart_products: {
        productId,
      },
    },
  };

  return await cartModel.updateOne(query, updateSet);
};

export const getUserCart = async ({ userId }) => {
  return await cartModel
    .findOne({
      cart_user_id: userId,
    })
    .lean();
};
