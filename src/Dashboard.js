import {React,useApiData, useState, useMemo, useCallback,useDispatch, useSelector,apiAction,Card,useNavigate,DashboardHeader,search,sorting} from "./imports"

function Dashboard3() {
  const data = useApiData();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('asc');
  const navigate = useNavigate();

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
  

  return (
    <main>
      <DashboardHeader
        title="Dashboard 3"
        searchPlaceholder="Search by title or description"
        handleSearchSubmit={handleSearchSubmit}
        handleSearch={handleSearch}
        handleSorting={handleSorting}
        sortBy={sortBy}
        orderBy={orderBy}
      />

      <div className="container">
        {sortedData.map(item => (
          <Card key={item.id} item={item} handleClick={() => handleClick(item.id)} />
        ))}
      </div>
    </main>
  );
}

export default Dashboard3;
