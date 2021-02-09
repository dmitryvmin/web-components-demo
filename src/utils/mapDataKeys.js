/**
 * Maps each item in the provided data array to keyFieldPair config.
 * keyFieldPair is a tuple consisting of [key, field]:
 * key - name of the key in the returned datum object
 * field - name of the field in the input datum object
 */
function mapDataKeys(data, keyFieldPair) {
  if (!data || !data.length) {
    return [];
  }
  return data.map(datum => keyFieldPair.reduce((acc, [key, field]) => ({ ...acc, [key]: datum[field] }), {}));
}

export default mapDataKeys;
