import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiAction } from './redux/redux';
import Card from './Card';
import "./App.css"
import {useNavigate } from 'react-router-dom';
import Header from './Header';

const search = (items=[], query, queryList=["title","description","category"]) => items.filter(item => queryList.some(key => item[key].toLowerCase().indexOf(query.toLowerCase()) !== -1));

function Dashboard(props) {
  const data = useSelector(state => state.apiReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [tempData,setTempData] = useState([])
  const [opData,setOpData] = useState(tempData)
  const [searchQuery,setSearchQuery] = useState('')

  useEffect(()=>{
    dispatch(apiAction())
  },[dispatch])

  useEffect(()=>{
    setTempData(data.data)
  },[data])
  useEffect(()=>{
    setOpData(tempData)
  },[tempData])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(opData);
    const searchedData = search(tempData,searchQuery)
    console.log(searchedData);
    setOpData(searchedData)
}



  return (
    <main>
        <Header handleSubmit={handleSubmit} setSearchQuery={setSearchQuery}/>
        {/* <div className="header">
            <div className="logo"><h2>Logo</h2></div>
            <div className="search-bar">
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={(e)=>{setSearchQuery(e.target.value)}}/>
                    <input type="submit" value="Search" />
                </form>
            </div>
            <div className="sorting"></div>
        </div> */}
        <div className='container'>
            {data.loading?<h2>Loading</h2>:opData.map(item=><div className='card' key={item.id} onClick={()=>{navigate(`${item.id}`)}}><Card item={item}/></div>)}
        </div>
    </main>

  );
}

export default Dashboard;