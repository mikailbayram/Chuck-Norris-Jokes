import {Search} from "./Search";
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Map,List} from 'immutable';


configure({ adapter: new Adapter() });

describe('Search Component', () => {
    let wrapper;
     beforeEach(() => {
       const jokes = Map({
           "dev":List([1]),
           "music":List([1])
       });
       wrapper = shallow(<Search jokes={jokes}/>)
     })
    it("renders correctly",()=>{
        expect(wrapper.find('.search')).toHaveLength(1);
    })
    it("changes state on input", ()=>{
        const textField = wrapper.find("TextField");
        textField.simulate('change', { target: { value: 'Hello' } });
        expect(wrapper.state().searchValue).toEqual("Hello");
    })
    it("gets all jokes", ()=>{
        wrapper.instance().getAllJokes();
        expect(wrapper.state().allJokes).toEqual([1,1]);
    })
    it("searches for jokes", ()=>{
        wrapper.setState({searchValue:"joke", allJokes:[{value:"joke"},{value:"a"}]});
        wrapper.instance().searchJokes();
        expect(wrapper.state().gotresults).toEqual(true);
    })
  });