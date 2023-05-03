import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { apiAction } from './redux/redux';
import Card from './Card';

function View(props) {
    const data = useSelector(state => state.apiReducer)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(apiAction())
    },[dispatch])
    const id = useParams()
    return (
        <div>
            {data.loading?<h2>Loading</h2>:<Card item={data.data.find(item=>item.id===parseInt(id.id))}/>}
        </div>
    );
}

export default View;