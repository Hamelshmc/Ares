async function builderQuery(object) {
  if (typeof object !== 'object') {
    throw new Error('Invalid input column builder');
  }
  if (Object.entries(object).length === 0) {
    return '';
  }
  const keys = Object.keys(object);
  let column = '';
  column = keys.map((key) => `${key}=${object[key]}`).join('&');
  const result = `?${column}`;
  console.log(result);
  return result;
}

module.exports = {
  builderQuery,
};
