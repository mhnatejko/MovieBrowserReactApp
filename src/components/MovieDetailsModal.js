import React from 'react';
import Modal from 'react-modal';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root')

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      padding: "1",
     
      boxShadow: "0px 0px 20px black",
      backgroundColor: "#f8f5ec",
      border: "none",
    }
  };


class MovieDetailsModal extends React.Component {
  render(){
    return (
      <Modal 
            isOpen={this.props.modalIsOpen}
            onRequestClose={this.props.closeModal}
            contentLabel="movie details"
            style={customStyles}            
      >              
        
        <div className="modal">
          <button onClick={this.props.closeModal}>+</button>
          <div className="modal__header">
            <h1>{this.props.details.title}</h1>  
            {this.props.details.title !== this.props.details.original_title && <h2>{this.props.details.original_title}</h2>}            
            {this.props.details.tagline && <h3>"{this.props.details.tagline}"</h3>}
          </div>
          <div className="modal__main-content">
            <img src={this.props.returnPictureUri(this.props.details.poster_path)} alt="poster"/>
            <div className="modal__main-content--info">
              <p><span className="modal__main-content--info-name">rate: </span>{this.props.details.vote_average}/10 from {this.props.details.vote_count} votes</p>
              <p><span className="modal__main-content--info-name">time: </span>{this.props.details.runtime} min </p> 
              <p><span className="modal__main-content--info-name">language: </span>{this.props.details.original_language}</p>
              {this.props.details.production_countries && 
                <div>
                  <p><span className="modal__main-content--info-name">{this.props.details.production_countries.length > 1 ? "countries: " : "country: "}</span></p> 
                  {this.props.details.production_countries.map((el, i)=> <p key={i}>{el.name}</p>)}
                </div>
              }
              <div className="modal__main-content--genres">
                {this.props.details.genres &&  <div>{this.props.details.genres.map((el, i)=> <p className="genres" key={i}>{el.name}</p>)}</div>}
              </div>
            </div>
          </div>         
          <p className="modal__overview">{this.props.details.overview}</p> 
          
        </div>
          
      </Modal>
    )
  }
}
  
export default MovieDetailsModal;


