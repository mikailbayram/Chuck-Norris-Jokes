import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MdFormatQuote from "react-icons/lib/md/format-quote";
import "./Modal.css";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addEditedJoke } from '../../reducers/editedJokes';

class Joke extends Component {
  constructor(props){
      super(props);
      this.state={
          showEdit:false,
          editJoke:this.props.joke.value,
          editedJoke:{}
      }
  }
  componentWillMount(){
    this.isJokeEdited();
  }
  isJokeEdited(){
      const id = this.props.joke.id;
      const arr = this.props.editedJokes[this.props.path];
      arr.map((a)=>{
          if(a.id===id)
            this.setState({editedJoke:a},()=>console.log(a))
      })
  }
  editJoke(){
    const joke = {...this.props.joke,value:this.state.editJoke}
    this.props.addEditedJoke(joke);
    this.isJokeEdited();
  }
  render() {
    const actions = [
        <FlatButton
          label="Edit Joke"
          primary={true}
          onClick={()=>this.setState({showEdit:true})}
        />
      ];
    return (
        <Dialog
            modal={false}
            open={this.props.open}
            onRequestClose={()=>this.props.close()}
            className="modal"
            actions={!this.state.showEdit&&actions}
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
            {this.state.showEdit&&
            <div className="edit-joke">
            <TextField
             id="edit-joke-text" 
             fullWidth={true}
             multiLine={true} 
             defaultValue={this.state.editJoke}
             onChange={(e)=>this.setState({editJoke:e.target.value})}/>
             <FlatButton className="edit-joke-button" label="Submit Change" primary={true} onClick={()=>this.editJoke()} /></div>}
        </Dialog>
    );
  }
}
const mapStateToProps = state => {
    return { jokes: state.jokes.jokes, editedJokes:state.editedJokes };
  };
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        addEditedJoke: addEditedJoke
      },
      dispatch
    );
  };
export default connect(mapStateToProps,mapDispatchToProps)(Joke);
