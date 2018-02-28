import {Navbar} from "./Navbar";
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Map,List} from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

configure({ adapter: new Adapter() });

describe('Navbar Component', () => {
    let wrapper;
     beforeEach(() => {
        const history = {
            location:{
                pathname:"dev"
            },
            push:(value)=>{
                return true;
            }
        }
       wrapper = shallow(<Navbar history={history}/>)
     })
    it("renders correctly",()=>{
        expect(wrapper.find('Tabs')).toHaveLength(1);
    })
    it("handles call to router", ()=>{
        wrapper.instance().handleCallToRouter();
    })
  });