import React from 'react';

function Header(props) {
    return (
        <div className="header">
            <div className="logo"><h2>Logo</h2></div>
            <div className="search-bar">
                <form onSubmit={props.handleSubmit}>
                    <input type="text" onChange={(e)=>{props.setSearchQuery(e.target.value)}}/>
                    <input type="submit" value="Search" />
                </form>
            </div>
            <div className="sorting"></div>
        </div>
    );
}

export default Header;