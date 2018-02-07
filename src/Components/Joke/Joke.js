import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import MdFormatQuote from "react-icons/lib/md/format-quote";
import "./Joke.css";

class Joke extends Component {
  render() {
    return (
        <Card className="joke">
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
            </CardText>
        </Card>
    );
  }
}

export default Joke;
