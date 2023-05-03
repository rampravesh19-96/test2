const search = (items = [], query, queryList = ['title', 'description']) =>
  items.filter(item =>
    queryList.some(key =>
      (item[key] || '').toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  );


const sorting = (items = [], sortBy, isAscending = true) => {
  return items.sort((a, b) => {
    if (a[sortBy] > b[sortBy]) {
      return isAscending ? 1 : -1;
    }
    if (a[sortBy] < b[sortBy]) {
      return isAscending ? -1 : 1;
    }

    return 0;
  });
};

export {search,sorting}