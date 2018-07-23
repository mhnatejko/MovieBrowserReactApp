import React from "react";
import VoteStars from "./VoteStars";

class Posters extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="posters" >            
                <img src={this.props.returnPictureUri(this.props.path)} alt={this.props.title}/>            
                <div className="posters__info">
                    <h1>{this.props.title}</h1>
                    <VoteStars vote={this.props.vote}/>
                    <h3>vote: {this.props.vote}/10</h3>                    
                    <h3>popularity: {this.props.popularity.toFixed(2)}</h3>
                    <p>{this.props.release_date}</p>
                </div>
                <div className="posters__buttons">
                    <button className="button--more" value={this.props.id} onClick={this.props.openModal}>more...</button>
                    <button className="button--add" value={this.props.id} onClick={this.props.findSimilar}>+</button>
                    <button className="button--fav" value={this.props.id} onClick={this.props.addToFavourite}><i className="icon-heart-empty icon-heart--add"></i></button>
                </div>
            </div>
        )
    }
}

export default Posters;