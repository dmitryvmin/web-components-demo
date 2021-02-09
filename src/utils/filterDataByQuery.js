function filterDataByQuery(data, query) {
  return data.filter(item => item.value.toLowerCase().includes(query.toLowerCase()));
}

export default filterDataByQuery;
