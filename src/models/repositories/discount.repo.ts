import discountModel from "../discount.model";
import projectionTransform from "~/utils/projection.transform";
import objectIdTransform from "~/utils/objectId.transform";
import { getOneInventory } from "./inventory.repo";
import errorRes from "~/core/error.response";
/**
 * Retrieves a discount by the provided parameters.
 *
 * @param {string} discountId - The ID of the discount to retrieve.
 * @param {string} shopId - The ID of the shop associated with the discount.
 * @param {string} discountCode - The code of the discount.
 * @return {Promise<any>} A Promise that resolves to the discount object.
 */
export const getOneDiscount = async ({
  discountId,
  shopId,
  discountCode
}: {
  discountId?: string;
  shopId?: string;
  discountCode?: string;
}) => {
  const _filter = {
    _id: discountId,
    discount_shop_id: shopId,
    discount_code: discountCode
  };
  const _opts = { lean: true };
  return await discountModel.findOne(_filter, null, _opts).exec();
};
export const validProductIds = async ({ productIds, shopId }) => {
  const validateList = productIds.map(async id => {
    return getOneInventory({ shopId, productId: id });
  });
  try {
    await Promise.all(validateList);
  } catch {
    throw new errorRes("BAD_REQUEST", "invalid product id");
  }
};
export const validDiscountUsage = async ({
  userId,
  shopId,
  productId,
  discountId,
  cost
}: {
  userId: string;
  shopId: string;
  productId: string;
  discountId: string;
  cost: number;
}) => {
  const _currentDate = new Date();
  const _valid_discount_specific_productId_filter = [
    {
      $and: [
        { discount_applies_to: "specific" },
        { $expr: { $in: [productId, "$discount_product_ids"] } }
      ]
    },
    { discount_applies_to: "all" }
  ];
  const discount_max_uses_per_user_filter = {
    $gt: [
      "$discount_max_uses_per_user",
      {
        $cond: {
          if: { $in: [userId, "$discount_users_used.id"] },
          then: {
            $arrayElemAt: [
              "$discount_users_used.count",
              { $indexOfArray: ["$discount_users_used.id", userId] }
            ]
          },
          else: 0
        }
      }
    ]
  };
  const filter = {
    _id: objectIdTransform(discountId),
    discount_is_active: true,
    discount_start_day: { $lte: _currentDate },
    discount_end_day: { $gte: _currentDate },
    discount_shop_id: objectIdTransform(shopId),
    discount_min_order_value: { $lte: cost },
    $or: _valid_discount_specific_productId_filter,
    $expr: discount_max_uses_per_user_filter
  };
  const _user_usage_count = {
    user_used_count: {
      $cond: {
        if: { $in: [userId, "$discount_users_used.id"] },
        then: {
          $arrayElemAt: [
            "$discount_users_used.count",
            { $indexOfArray: ["$discount_users_used.id", userId] }
          ]
        },
        else: 0
      }
    }
  };
  const _projection = {
    discount_type: 1,
    discount_value: 1,
    user_used_count: 1
  };
  const temp = await discountModel
    .aggregate([
      { $match: filter },
      { $set: _user_usage_count },
      { $project: _projection }
    ])
    .exec();
  console.log("xxxxxxxx", temp);
  return temp[0];
};

// export const applyDiscount = async ({
//   userId,
//   shopId,
//   productId,
//   discountId,
//   cost,
//   session = null
// }: {
//   userId: string;
//   shopId: string;
//   productId: string;
//   discountId: string;
//   cost: number;
//   session?: any;
// }) => {
//   return await validDiscountUsage({
//     userId,
//     shopId,
//     productId,
//     discountId,
//     cost
//   });
// };
export const applyDiscount = async ({
  userId,
  shopId,
  productId,
  discountId,
  cost,
  session = null
}: {
  userId: string;
  shopId: string;
  productId: string;
  discountId: string;
  cost: number;
  session?: any;
}) => {
  console.log("apply  discount");

  const discount = await validDiscountUsage({
    userId,
    shopId,
    productId,
    discountId,
    cost
  });
  let _update_query: unknown = {
    $inc: { discount_uses_count: 1, discount_max_uses: -1 },
    $push: {
      discount_users_used: {
        id: userId,
        count: 1
      }
    }
  };
  let _opt: any = {
    upsert: true,
    session
  };
  if (discount.user_used_count !== 0) {
    (_opt.arrayFilters = [{ "elem.id": userId }]),
      (_update_query = {
        $inc: {
          discount_uses_count: 1,
          discount_max_uses: -1,
          "discount_users_used.$[elem].count": 1
        }
      });
  }
  await discountModel
    .findOneAndUpdate(
      { _id: objectIdTransform(discountId) },
      _update_query,
      _opt
    )
    .exec();
  // Calculate and return amount discounted after applying the discount
  let amountDiscounted = 0;
  // Calculation discount amount
  if (discount.discount_type === "fixed_amount") {
    amountDiscounted = discount.discount_value;
  } else {
    amountDiscounted = +(discount.discount_value * (cost / 100)).toFixed(2);
  }
  return amountDiscounted;
};
export const cancelDiscount = async () => {};
