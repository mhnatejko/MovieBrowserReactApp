import React from "react";
import Posters from "./Posters";

class Movies extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <section className="movies">           
                {this.props.movieDataResults
                    && 
                this.props.movieDataResults.map(el => <Posters  key={el.id} 
                                                                id={el.id}
                                                                vote={el.vote_average} 
                                                                popularity={el.popularity} 
                                                                title={el.title} 
                                                                path={el.poster_path}
                                                                openModal={this.props.openModal}
                                                                release_date={el.release_date}
                                                                findSimilar={this.props.findSimilar}
                                                                addToFavourite={this.props.addToFavourite}
                                                                returnPictureUri={this.props.returnPictureUri}
                                                        />)
                }
            </section>
        )
    }
}   

export default Movies;