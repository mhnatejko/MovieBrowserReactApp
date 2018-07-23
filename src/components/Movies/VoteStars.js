import React from "react";

class VoteStars extends React.Component {
    makeStarsVote(vote){
        let fullStar = <i className="icon-star"></i>;
        let halfFullStar = <i className="icon-star-half-alt"></i>;
        let emptyStar = <i className="icon-star-empty"></i>;

        let starsArr = Array(10);

        let numberOfFullStars = Math.floor(vote);
        let numberOfHalfFullStars = Math.ceil(Math.round(vote) - Math.floor(vote));
        //let numberOfEmptyStars = 10 - numberOfFullStars;
        
        for(let i = 0; i < numberOfFullStars; i++){
            starsArr[i] = fullStar
        }
        for(let i = numberOfFullStars; i < numberOfFullStars+numberOfHalfFullStars; i++){
            starsArr[numberOfFullStars] = halfFullStar
        }
        for(let i = numberOfFullStars+numberOfHalfFullStars; i < starsArr.length; i++){
            starsArr[i] = emptyStar
        }
        return starsArr;
    }
    
    render(){
        return(
            <div className="starsBar">
                <div className="stars">
                    {this.makeStarsVote(this.props.vote)}
                </div>
            </div>
        )
    }
}

export default VoteStars;