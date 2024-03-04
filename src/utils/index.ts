import _ from "lodash";

export const getInfo = ({ fields = [], obj = {} }) => {
  return _.pick(obj, fields);
};
