import React, { Component } from 'react';
import Joke from '../Joke/Joke';
import "./Home.css"
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {fromJS} from 'immutable';
import getJokes from '../../getJokes';
import {connect} from 'react-redux';


export class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            joke:{},
            loading:true,
            clicked:false
        }
    }
  componentDidMount(){
      fetch("https://api.chucknorris.io/jokes/random")
      .then(res=>res.json())
      .then(res=>{
        this.setState({joke:fromJS(res),loading:false})
      })
  }
  getAllJokes(){
    this.setState({clicked:true});
    getJokes();
  }
  render() {
    return (
      <div className="home">
      {this.state.loading?
        <CircularProgress className="loader" size={200} thickness={5} />:
        <div>
          <img src="https://assets.chucknorris.host/img/chucknorris_logo_coloured_small@2x.png" alt="Chuck Norris" className="chuck-image"/>
          <RaisedButton label="Sync all jokes" 
          primary={true} 
          className="sync-button"
          onClick={()=>this.getAllJokes()}
          disabled={this.state.clicked&&!this.props.synced} />
           {this.state.clicked&&!this.props.synced&&<CircularProgress className="loader small" size={20} thickness={5} />}
          <Joke joke={this.state.joke} isHome={true} icon="https://assets.chucknorris.host/img/avatar/chuck-norris.png"/>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state,ownProps) => {
  return { synced:state.jokes.get("synced") };
};

export default connect(mapStateToProps,null)(Home);