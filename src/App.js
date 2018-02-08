import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getJokesFromStore } from './reducers/jokesReducer';
import * as localforage from "localforage";

import Home from './Components/Home/Home';
import Jokes from './Components/Jokes/Jokes';
import Navbar from './Components/Navbar/Navbar';


class App extends Component {
  componentWillMount(){
    localforage.getItem("jokes").then((jokes)=>{
      this.props.getJokes(jokes);
    })
  }
  render() { 
    return (
      <MuiThemeProvider>
      <Router>
        <div>
          <Navbar/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/jokes/:category" component={Jokes}/>
        </div>
      </Router>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getJokes: getJokesFromStore
    },
    dispatch
  );
};


export default connect(null,mapDispatchToProps)(App);

