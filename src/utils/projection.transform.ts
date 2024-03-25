/**
 * get array of select and unselect fields for create mongo query
 * @param select optional string array eg ["key1", "key2"]
 * @param unselect optional string array eg ["key1", "key2"]
 * @returns projection object eg {key1: 1, key2: 0}
 */
const projectionTransform = ({
  select,
  unselect,
}: {
  select?: string[];
  unselect?: string[];
}) => {
  const _select = select
    ? Object.fromEntries(select.map((key) => [key, 1]))
    : null;
  const _unselect = unselect
    ? Object.fromEntries(unselect.map((key) => [key, 0]))
    : null;
  return { ..._select, ..._unselect };
};

export default projectionTransform;
