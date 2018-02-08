import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Modal from "../Modal/Modal"
import MdFormatQuote from "react-icons/lib/md/format-quote";
import "./Joke.css";

class Joke extends Component {
  constructor(props){
      super(props);
      this.state = {
          open:false
      }
  }
  close(){
      this.setState({open:false})
  }
  render() {
    return (
            <Card className="joke" onClick={()=>this.setState({open:true})}>
                <CardHeader
                title="Juck Norris"
                subtitle={this.props.path?this.props.path:"Random"}
                avatar={this.props.icon}
                children={<div className="posted-at">
                    {this.props.joke.posted}
                </div>}
                />
                <CardText className="joke-text-wrapper">
                    <MdFormatQuote className="quote-icon"/><div className="joke-text">{this.props.joke.value}</div>
                    {this.state.open&&<Modal close={()=>this.close()}
                    icon={this.props.icon} 
                    open={this.state.open} 
                    joke={this.props.joke}
                    path={this.props.path}/>}
                </CardText>
            </Card>
       
    );
  }
}

export default Joke;
