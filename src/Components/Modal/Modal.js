import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MdFormatQuote from "react-icons/lib/md/format-quote";
import "./Modal.css";

class Modal extends Component {
  render() {
    return (
        <Dialog
            modal={false}
            open={this.props.open}
            onRequestClose={()=>this.props.close()}
            className="modal"
        >       
            {this.state.editedJoke.value&&<Card>
                    <CardHeader
                    title="Juck Norris"
                    subtitle={"Edited Joke"}
                    avatar={this.props.icon}
                    children={<div className="posted-at">
                        {this.props.joke.posted}
                    </div>}
                    />
                    <CardText className="joke-text-wrapper">
                        <MdFormatQuote className="quote-icon"/><div className="joke-text">{this.state.editedJoke.value}</div>                   
                </CardText>
            </Card>}
                <Card>
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
        </Dialog>
    );
  }
}

export default Modal
