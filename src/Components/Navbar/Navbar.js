import React, { Component } from 'react';
import "./Navbar.css"
class App extends Component {
  render() {
    return (
      <div className="navbar">
        {this.props.children}
      </div>
    );
  }
}

export default App;
