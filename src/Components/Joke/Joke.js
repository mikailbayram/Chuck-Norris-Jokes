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
                subtitle={!this.props.isHome?this.props.joke.category[0]:"Random"}
                avatar={this.props.icon}
                children={<div className="posted-at">
                    {this.props.joke.posted}
                    <br/>
                    {!this.props.isHome&&<span>Times Repeated: {this.props.joke.times_repeated}</span>}
                </div>}
                />
                <CardText className="joke-text-wrapper">
                    <MdFormatQuote className="quote-icon"/>
                    {this.props.text?<div className="joke-text" dangerouslySetInnerHTML={{__html: this.props.text}}/>
                    :<div className="joke-text">{this.props.joke.value}</div>}
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
