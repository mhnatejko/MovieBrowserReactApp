import React from "react";

const SearchBar = (props) => {
    return (
        <div className="searchbar">            
            <input  onChange={props.captureTitle} 
                    onKeyPress={props.enterPressed}
                    type="text" 
                    placeholder="what you looking for... ?" 
                    value={props.value}
            ></input>
            <button onClick={props.startSearch}>search...</button>
            <button className="favourite-button" onClick={props.loadFavourite}><i className="icon-heart icon-heart--list"></i></button>
        </div>
    )
}

export default SearchBar;