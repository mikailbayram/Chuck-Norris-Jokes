import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { withRouter } from "react-router-dom";
import "./Navbar.css"

class Navbar extends Component {
    handleCallToRouter = (value) => {
        this.props.history.push(value);
    }
  render() {
    return (
        <Tabs
            value={this.props.history.location.pathname}
            onChange={this.handleCallToRouter}
        >
          <Tab label="Home" value="/"/>
          <Tab label="Explicit" value="/jokes/explicit"/>
          <Tab label="Dev" value="/jokes/dev"/>
          <Tab label="Movie" value="/jokes/movie"/>
          <Tab label="Food" value="/jokes/food"/>
          <Tab label="Celebrity" value="/jokes/celebrity"/>
          <Tab label="Science" value="/jokes/science"/>
          <Tab label="Sport" value="/jokes/sport"/>
          <Tab label="Political" value="/jokes/political"/>
          <Tab label="Religion" value="/jokes/religion"/>
          <Tab label="Animal" value="/jokes/animal"/>
          <Tab label="History" value="/jokes/history"/>
          <Tab label="Music" value="/jokes/music"/>
          <Tab label="Travel" value="/jokes/travel"/>
          <Tab label="Career" value="/jokes/career"/>
          <Tab label="Money" value="/jokes/money"/>
          <Tab label="Fashion" value="/jokes/fashion"/>
        </Tabs>
    );
  }
}

export default withRouter(Navbar);
