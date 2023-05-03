import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"

const apiReducer = (state={data:[],loading:true},action) => {
    switch(action.type){
        case 'ON_SUCCESS' : return {...state,data:action.payload,loading:action.loading}
        default : return state
    }
}

const rootReducer = combineReducers({
    apiReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))

const apiAction = () =>{
    return dispatch => {
        fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => dispatch({type:'ON_SUCCESS',payload:data,loading:false}))
    }
}

export {rootReducer,apiAction,store}