import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Joke from '../Joke/Joke'
import "./Search.css"
import * as localforage from "localforage";
import CircularProgress from 'material-ui/CircularProgress';
import {fromJS} from 'immutable';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getJokesFromStore} from '../../reducers/jokesReducer'
import debounce from 'debounce';

export class Search extends Component {
  constructor(props){
      super(props);
      this.state = {
          allJokes:[],
          searchValue:"",
          searchResults:[],
          editedText:[],
          gotresults:false,
      }
  }
  componentWillReceiveProps(newProps){
      if(this.props.jokes!==newProps.jokes)
      this.getAllJokes();
  }

  componentWillMount(){
    localforage.getItem("jokes").then((jokes)=>{
        this.props.getJokes(jokes);
      })
  }
  
  searchJokes = debounce(()=>{
      let regEx = new RegExp(this.state.searchValue, 'i');
      const allJokes=[...this.state.allJokes];
      const searchResults = [];
      const foundStrings=[];
      let j = 0;
      for(let i =0;i<allJokes.length;i++){
          let found = allJokes[i].value.match(regEx);  
          if(found&&this.state.searchValue.length>0){
            searchResults.push(allJokes[i]);
            foundStrings.push(searchResults[j].value.substring(found.index,found.index+this.state.searchValue.length));
            j++;
        } 
      }
      const editedText=[];
      for(let i = 0; i<searchResults.length;i++){
        editedText.push(searchResults[i].value.replace(regEx,"<span class='searchResult'>"+foundStrings[i]+"</span>"));
      }
      this.setState({searchResults:fromJS(searchResults),gotresults:true,editedText:editedText})
  },500);
  
  getAllJokes(){
      const jokes = this.props.jokes.toJS();
      const categories = Object.keys(jokes);
      const arr = [];
      for(let i = 0;i<categories.length;i++){
          for(let j = 0;j<jokes[categories[i]].length;j++){
              arr.push(jokes[categories[i]][j]);
          }
      }
      this.setState({allJokes:arr},()=>console.log(this.state.allJokes))
  }

  render() {
    return (
        <div>
            <div className="search">
            <TextField fullWidth={true} hintText="Search through jokes" onChange={(e)=>{this.setState({searchValue: e.target.value, gotresults: false})
                         this.searchJokes();
                        }}/>
            </div>
            {!this.state.gotresults&&this.state.searchValue.length>0?
            <CircularProgress className="loader" size={200} thickness={5} />:
            <div>
            {this.state.searchResults.map((joke,i)=>{
                return(
                    <Joke joke={joke} key={i} text={this.state.editedText[i]}/>
                )
            })}</div>
        }
        </div>
    );
  }
}

const mapStateToProps = state => {
    return { jokes: state.jokes.get("jokes") };
  };

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        getJokes: getJokesFromStore
      },
      dispatch
    );
  };
export default connect(mapStateToProps,mapDispatchToProps)(Search);
