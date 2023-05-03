import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiAction } from './redux/redux';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import "./Dashboard3.css"

const search = (items = [], query, queryList = ['title', 'description']) =>
  items.filter(item =>
    queryList.some(key =>
      item[key].toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  );
const sorting = (items=[],sortBy,isAscending=true) => {
    return items.sort((a,b)=>{
        if(a[sortBy] > b[sortBy]){
            return isAscending ? 1 : -1
        }
        if(a[sortBy] < b[sortBy]){
            return isAscending ? -1 : 1
        }

        return 0
    })
}



function Dashboard3(props) {
    const data = useSelector(state=>state.apiReducer)
    const dispatch = useDispatch()
    const [query,setQuery] = useState('')
    const [tempData,setTempData] = useState([])
    const [opData,setOpData] = useState(tempData)
    const [sortBy,setSortBy] = useState('')
    const [orderBy,setOrderBy] = useState('asc')
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(apiAction())
    },[dispatch])

    useEffect(()=>{
        setTempData(data.data)
    },[data])

    useEffect(()=>{
        setOpData(tempData)
    },[tempData])

    const handleClick = (id) => {
        navigate(`${id}`)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(search(tempData,query));
        setOpData(search(tempData,query))
    }


    const handleSorting = (sortBy,isAscending=true) => {
        const sortedData = sorting([...tempData], sortBy,isAscending);
        setOpData(sortedData);
        setSortBy(sortBy)
      };


      

    return (
        <main>
            <div className="header">
                <form onSubmit={handleSearch}>
                    <input type="text" onChange={(e)=>{setQuery(e.target.value)}} />
                    <input type="submit" value="Search" onChange={(e)=>{setQuery(e.target.value)}}/>
                </form>
                <div>
                    <div>
                        <label>Sort By</label>
                        <select onChange={(e)=>{
                            handleSorting(e.target.value,orderBy==="asc");
                            setSortBy(e.target.value)
                            }}>
                            <option value="">....Select...</option>
                            <option value="title">Name</option>
                            <option value="price">Price</option>
                        </select>
                    </div>
                    {sortBy &&                     
                    <div>
                        <label>Order By</label>
                        <select onChange={(e)=>{
                            handleSorting(sortBy,e.target.value==="asc");
                            setOrderBy(e.target.value)
                            }}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>}

                </div>
            </div>
            <br />
            <div className="container">
                {data.loading?<h2>Loading</h2>:opData.map(item => <Card key={item.id} handleClick={()=>{handleClick(item.id)}} item={item}/>)}
            </div>
        </main>
    );
}

export default Dashboard3;