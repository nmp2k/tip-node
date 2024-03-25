import _ from "lodash";

export const getInfo = ({ fields = [], obj = {} }) => {
  return _.pick(obj, fields);
};

export function flattenObject(obj: any): Record<string, any> {
  const res: Record<string, any> = {};
  const isObject = (obj: any, k: string) => {
    return obj[k] && typeof obj[k] === "object" && !Array.isArray(obj[k]);
  };
  const recurse = (cur: any, pre?: string) => {
    const key = Object.keys(cur);

    key.forEach((k) => {
      const tempKey = pre ? `${pre}.${k}` : k;

      if (isObject(cur, k)) {
        recurse(cur[k], tempKey);
      } else if (cur[k] && cur[k] !== "undefined") {
        res[tempKey] = cur[k];
      }
    });
  };
  recurse(obj);
  return res;
}
