import {Jokes} from "./Jokes";
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Map,List} from 'immutable';
import configureStore from 'redux-mock-store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

configure({ adapter: new Adapter() });

describe('Jokes Component', () => {
    let wrapper;
    const addJoke = jest.fn();
    const mockStore = configureStore();
    let store;
    const initialState = {};

     beforeEach(() => {
       const match = {
           params:{
               category:"dev"
           }
       }
       store = mockStore(initialState);
       wrapper = mount(<MuiThemeProvider><Jokes match={match} error={false} addJoke={addJoke} store={store} /></MuiThemeProvider>)
     })
  
     it('should call the add Joke', () => {
        expect(addJoke.mock.calls.length).toBe(1)
       })
     it('changes routes', ()=>{
        const categroies = ["explicit","dev","movie","food","celebrity","science","sport","political","religion","animal"
        ,"history","music","travel","career","money","fashion","a"];
        for(let i = 0; i<categroies.length;i++){
            const newMatch = {
                params:{
                    category:categroies[i]
                }}
            wrapper.setProps({ match:newMatch });
        }
     })
     it('renders jokes',()=>{
        const jokes =  List([Map({value:"asd"}),Map({value:"asd"})]);
        const match = {
            params:{
                category:"dev"
            }}
        wrapper.setProps({ jokes:jokes,loaded:true });
     })
     it("renders when joke is not added", ()=>{
         wrapper.setProps({error:true});
     })
  });