import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Map,List} from 'immutable';

configure({ adapter: new Adapter() });

describe('<Modal />', () => {
    let joke;
    let wrapper;
    beforeAll(()=>{
        joke = Map({
            category:List(["Dev"]),
            posted:"22:10"
        })
        wrapper = shallow(<Modal joke={joke} open={true} />);
    })

    it('renders without crashing',()=>{
        wrapper.instance().render();
    })
    it('shows path passed through props',()=>{
        wrapper = shallow(<Modal joke={joke} path="Dev" open={true}/>)
        wrapper.instance().render();
    })

});
