import React from "react";

const SortPanel = (props) => {
    return (
        <div>
            {props.movieReady && props.movieReady.length > 0 ? (
                <div className="sortpanel">
                    <p className="sortpanel__sort-by">sort by</p>
                    <button onClick={props.sortAverage}>rating</button>
                    <button onClick={props.sortPopularity}>popularity</button>
                    <button onClick={props.sortDate}>date</button>
                    <input  type="text" 
                            value={props.value} 
                            placeholder="filter by..."
                            onChange={props.filter}
                    ></input>
                </div>
            ) : (
                <div>
                    <p className="no_results_alert">there is nothing here</p>
                </div>
            )}
        </div>
    )
}

export default SortPanel;