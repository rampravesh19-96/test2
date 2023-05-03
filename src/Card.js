import React from 'react';
import "./Card.css"
const item = {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
        "rate": 3.9,
        "count": 120
    }
}
function Card({item,handleClick}) {
    return (
        <div className='card' onClick={handleClick}>
            <div className='img-container'>
                <img src={item.image}/>
            </div>
            <div className='info'>
                <h2 className='title'>{item.title}</h2>
                <p className='description'>{item.description}</p>
                <div className='review-count'>{item.rating.count}</div>
                <h3 className='price'>{item.price}</h3>
            </div>
            
        </div>
    );
}

export default Card;