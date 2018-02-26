import React, { Component } from 'react';
import "./Jokes.css"
import Joke from '../Joke/Joke';
import CircularProgress from 'material-ui/CircularProgress';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addJoke } from '../../reducers/jokesReducer';

export class Jokes extends Component {
  constructor(props){
    super(props);
    this.state={
      path:"",
      icon:"",
      loading:true,
      jokes:[]
    }
  }
  componentWillMount(){
    let pathName=this.props.match.params.category;
    this.setState({path:pathName},()=>{
      this.props.addJoke(this.state.path);
      this.setIcon();
    })
  }
  componentWillReceiveProps(newProps){
    if(this.props.match.params.category!==newProps.match.params.category){
      let pathName=newProps.match.params.category;
      this.setState({path:pathName},()=>{
        this.props.addJoke(this.state.path);
        this.setIcon();
      })
    }
  }
  setIcon(){
    let icon ="";
    switch(this.state.path){
      case "explicit": icon="https://i.pinimg.com/736x/6f/42/54/6f425430ecf13f2987199effda4f3003.jpg"
      break;
      case "dev": icon="http://envri.eu/wp-content/uploads/2016/08/software-developer-copy-1024x1024.jpg"
      break;
      case "movie": icon="http://www.clipartool.com/wp-content/uploads/2016/04/movie-clipart-movie-clapper-board.png"
      break;
      case "food": icon="https://www.soomska.com/wp-content/uploads/2017/12/2-1.jpg"
      break;
      case "celebrity": icon="https://assets.chucknorris.host/img/avatar/chuck-norris.png"
      break;
      case "science": icon="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png"
      break;
      case "sport": icon="https://shop.savethechildren.org.uk/wp-content/uploads/2016/10/football-1-600x436.png"
      break;
      case "political": icon="http://www.uskinfo.ba/files/news/5884c11f752c44.06856981_bakir-izetbegovic.jpg"
      break;
      case "religion": icon="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/RELIGIONES.png/220px-RELIGIONES.png"
      break;
      case "animal": icon="https://cdn.bestfriends.org/s3fs-public/pages/close-up-cat-eyes.jpg"
      break;
      case "history": icon ="http://cdn.history.com/sites/2/2015/03/history-lists-11-innovations-that-changed-history-the-compass_iStock_000016699382Medium-A.jpeg"
      break;
      case "music": icon="https://yt3.ggpht.com/pHwZj3tkgC3SJFbuqebBoT7WtVcIwAijEmcbe9VDCauv9ZlG6uS2zjvZQUSO7SfFqa3xjYqGp_L4QbM7=s288-mo-c-c0xffffffff-rj-k-no"
      break;
      case "travel": icon="http://www.miab.co.uk/cm-uploads/mi/ckfinder/images/Our%20Products/travel%20insurance.jpeg"
      break;
      case "career": icon="http://marshallalston.com/wp-content/uploads/2016/12/Marshall-Alston-Career-300x200.jpg"
      break;
      case "money": icon="https://i2.wp.com/thoughtforyourpenny.com/wp-content/uploads/money-world-orig.jpg?resize=800%2C445"
      break;
      case "fashion": icon="http://meow.blabbercat.com/images/res/article/steps-to-level-up-your-fashion-game-630.jpg"
      break;
      default: icon="https://assets.chucknorris.host/img/avatar/chuck-norris.png"
      break;
    }
    this.setState({icon});
  }
  render() {
    const headerStyle={
      textAlign:"center"
    }
    return (
      <div>
        {!this.props.loaded?
        <CircularProgress className="loader" size={200} thickness={5} />:
        <div className="jokes">
        {this.props.error&&<h3 style={headerStyle}>There has been an error, no new jokes added</h3>}
        {this.props.jokes.map((joke,i)=>{
        return(
          <Joke joke={this.props.jokes.get(i)} icon={this.state.icon} key={i}/>
        )})}
        </div>}
      </div>
    );
  }
}
const mapStateToProps = (state,ownProps) => {
  return { jokes: state.jokes.getIn(['jokes',ownProps.match.params.category]).reverse(), 
  error:state.jokes.get('error'), 
  loaded:state.jokes.get('fetched'),
  isFirst:state.jokes.get("isFirst") };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addJoke: addJoke
    },
    dispatch
  );
};


export default connect(mapStateToProps,mapDispatchToProps)(Jokes);
