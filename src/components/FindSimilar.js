import React from 'react';

class FindSimilar extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="findsimilar">
                <p className="findsimilar__paragraph">let's find something new!</p>
                <div className="findsimilar__miniPosters">
                    <div>{this.props.poster_path1 && <img height="100%" src={this.props.returnPictureUri(this.props.poster_path1)} alt="movie 1"/>}</div>
                    <p className="findsimilar__paragraph findsimilar__paragraph--dots">...</p>
                    <div>{this.props.poster_path2 &&<img height="100%" src={this.props.returnPictureUri(this.props.poster_path2)} alt="movie 2"/>}</div>
                </div>  
                <div className="findsimilar__buttons">
                    <button className="button__similar--find" onClick={this.props.startFindingSimilar}>find</button>
                    <button className="button__similar--clear" onClick={this.props.removeFindingSimilar}>clear</button>
                </div>
            </div>
        )
    }
}

export default FindSimilar;