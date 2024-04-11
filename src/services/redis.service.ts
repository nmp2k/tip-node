import { setNx, pExpire, delKey } from "~/utils/redis.utils";
import { reservationInventory } from "~/models/repositories/inventory.repo";
export const acquireLock = async ({
  productId,
  quantity,
  cartId,
  session = null
}: {
  productId: string;
  quantity: number;
  cartId: string;
  session?: any;
}) => {
  const key = `lock_v2024_${productId}`;
  const retryTimes = 10;
  const expireTime = 3000;
  for (let i = 0; i < retryTimes; i++) {
    const result = await setNx(key, expireTime);
    if (result) {
      const isReservation = await reservationInventory({
        productId,
        quantity,
        cartId,
        session
      });
      if (isReservation.modifiedCount) {
        await pExpire(key, expireTime);
        return key;
      }
      return null;
    } else {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
};

export const releaseLock = async ({ keyLock }) => {
  return await delKey(keyLock);
};
