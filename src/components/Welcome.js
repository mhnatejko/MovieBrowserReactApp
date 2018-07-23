import React from 'react';
import App from './../App';


class Welcome extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false

    }
  }
  handleActivate(){
    if(this.state.isOpen === false){
      this.setState({isOpen: true})
    }
  }

  render(){
    return (
      <div>
        {this.state.isOpen === false ? (
          <div className="welcome-page">
              <div>                
                  <h3>Discover new movies!</h3>                  
                  <h3>Use familiar title &amp; find unexpected similarities!</h3>
                  <h3>Add to favourites.</h3>
              </div>
              <button onClick={this.handleActivate.bind(this)}>go to browser</button>            
          </div>
        ) : (
          <App />
        )}        
      </div>
    )
  }
}

export default Welcome;