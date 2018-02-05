import React, { Component } from 'react';
import Joke from '../Joke/Joke';
import "./Home.css"
import CircularProgress from 'material-ui/CircularProgress';


class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            joke:{},
            loading:true
        }
    }
  componentDidMount(){
      fetch("https://api.chucknorris.io/jokes/random")
      .then(res=>res.json())
      .then(res=>this.setState({joke:res,loading:false}))
  }
  render() {
    return (
      <div className="home">
      {this.state.loading?
        <CircularProgress className="loader" size={200} thickness={5} />:
        <div>
          <img src="https://assets.chucknorris.host/img/chucknorris_logo_coloured_small@2x.png" alt="Chuck Norris" className="chuck-image"/>
          <Joke joke={this.state.joke} icon="https://assets.chucknorris.host/img/avatar/chuck-norris.png"/>
        </div>}
      </div>
    );
  }
}

export default Home;
