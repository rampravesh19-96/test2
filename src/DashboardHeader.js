import React from 'react';

function DashboardHeader({ handleSearch, handleSearchSubmit, handleSorting, sortBy, orderBy }) {
  return (
    <div className="header">
      <form onSubmit={handleSearchSubmit}>
        <input type="text" name="search" onChange={handleSearch} />
        <input type="submit" value="Search" />
      </form>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <label>Sort By</label>
          <select onChange={e => handleSorting(e.target.value, orderBy === "asc")}>
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
  );
}

export default DashboardHeader;
