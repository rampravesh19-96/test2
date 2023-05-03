import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiAction } from './redux/redux';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const search = (items = [], query, queryList = ['title', 'description']) =>
  items.filter(item =>
    queryList.some(key =>
      item[key].toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  );

function Dashboard2() {
  const data = useSelector(state => state.apiReducer);
  const dispatch = useDispatch();
  const [tempData, setTempData] = useState([]);
  const [opData, setOpData] = useState(tempData);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(apiAction());
  }, [dispatch]);

  useEffect(() => {
    setTempData(data.data);
  }, [data]);

  useEffect(() => {
    setOpData(tempData);
  }, [tempData]);

  const handleClick = id => {
    navigate(`${id}`);
  };

  const handleSearch = e => {
    e.preventDefault();
    setOpData(search(tempData, query));
  };

  return (
    <main>
      <div className="header">
        <form onSubmit={handleSearch}>
          <input type="text" onChange={e => setQuery(e.target.value)} />
          <input type="submit" value="Search" />
        </form>
      </div>
      <div className="container">
        {data.loading ? (
          <h2>Loading</h2>
        ) : (
          opData.map(item => (
            <Card
              key={item.id}
              item={item}
              handleClick={() => handleClick(item.id)}
            />
          ))
        )}
      </div>
    </main>
  );
}

export default Dashboard2;
