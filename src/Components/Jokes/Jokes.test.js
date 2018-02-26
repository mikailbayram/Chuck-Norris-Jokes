import {Jokes} from "./Jokes";
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Jokes Component', () => {
    let wrapper;
    const addJoke = jest.fn();
     beforeEach(() => {
       const match = {
           params:{
               category:"dev"
           }
       }
       wrapper = shallow(<Jokes addJoke={addJoke} match={match}/>)
     })
  
     it('should call the add Joke', () => {
        expect(addJoke.mock.calls.length).toBe(1)
       })
  });