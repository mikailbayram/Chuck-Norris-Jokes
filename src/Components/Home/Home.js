import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import "./Home.css"

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            joke:{}
        }
    }
  componentDidMount(){
      fetch("https://api.chucknorris.io/jokes/random")
      .then(res=>res.json())
      .then(res=>this.setState({joke:res}))
  }
  render() {
    return (
      <div className="home">
        
      </div>
    );
  }
}

export default Home;
