import React, { useEffect, useState, useMemo, useCallback, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiAction } from './redux/redux';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import "./Dashboard3.css"

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

function Dashboard3(props) {
  const data = useSelector(state => state.apiReducer);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('asc');
  const navigate = useNavigate();
  const id = useId()

  const filteredData = useMemo(() => {
    return search(data.data || [], query);
  }, [data.data, query]);

  const sortedData = useMemo(() => {
    return sorting(filteredData, sortBy, orderBy === 'asc');
  }, [filteredData, sortBy, orderBy]);

  const handleSearch = useCallback(
    e => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  const handleSearchSubmit = useCallback(
    e => {
      e.preventDefault();
      setQuery(e.target.search.value);
    },
    [setQuery]
  );

  const handleClick = useCallback(
    id => {
      navigate(`${id}`);
    },
    [navigate]
  );

  const handleSorting = useCallback(
    (sortBy, isAscending = true) => {
      setSortBy(sortBy);
      setOrderBy(isAscending ? 'asc' : 'desc');
    },
    [setSortBy, setOrderBy]
  );
  

  useEffect(() => {
    dispatch(apiAction());
  }, [dispatch]);

  return (
    <main>
      <div className="header">
        <form onSubmit={handleSearchSubmit}>
            <input type="text" name="search" onChange={handleSearch} />
            <input type="submit" value="Search" />
        </form>
        <div style={{display:"flex",gap:"20px"}}>
          <div>
            <label>Sort By</label>
            <select onChange={e => handleSorting(e.target.value,orderBy==="asc")}>
              <option value="">....Select...</option>
              <option value="title">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
          {sortBy && (
            <div>
              <label>Order By</label>
              <select
                onChange={e => handleSorting(sortBy, e.target.value === 'asc')}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <div className="container">
        {sortedData.map(item => (
          <Card key={item.id} item={item} handleClick={() => handleClick(item.id)} />
        ))}
      </div>
    </main>
  );
}

export default Dashboard3;
