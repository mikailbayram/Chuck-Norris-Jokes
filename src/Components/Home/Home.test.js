import {Home} from "./Home";
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Map,List} from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


configure({ adapter: new Adapter() });

describe('Home Component', () => {
    let wrapper;
     beforeEach(() => {
       wrapper = shallow(<Home synced={false}/>)
     })
    it("renders correctly",()=>{
        wrapper.setState({loading:false});
        expect(wrapper.state().loading).toEqual(false);
    })
    it("it gets all jokes",()=>{
        wrapper.setState({loading:false});
        const button = wrapper.find("RaisedButton").at(0);
        button.simulate("click");
        expect(wrapper.state().clicked).toEqual(true);
    })
  });