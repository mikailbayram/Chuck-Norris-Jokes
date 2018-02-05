import React, { Component } from 'react';
import "./Jokes.css"

class Jokes extends Component {
  constructor(props){
    super(props);
    this.state={
      path:""
    }
  }
  componentDidMount(){
    let pathName=this.props.history.location.pathname;
    pathName= pathName.substring(7,pathName.length);
    this.setState({path:pathName})
  }
  componentWillReceiveProps(newProps){
    if(this.props.history.location.pathname!=newProps.history.location.pathName){
      let pathName=newProps.history.location.pathname;
      pathName= pathName.substring(7,pathName.length);
      this.setState({path:pathName})
    }
      
  }
  render() {
    return (
      <div className="home">
        {this.state.path}
      </div>
    );
  }
}

export default Jokes;
