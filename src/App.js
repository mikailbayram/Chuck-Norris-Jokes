import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Home from './Components/Home/Home';
import Jokes from './Components/Jokes/Jokes';
import Navbar from './Components/Navbar/Navbar';

class App extends Component {
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

export default App;
