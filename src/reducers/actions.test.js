import {addJoke, getJokesFromStore, getAllJokes} from './jokesReducer';
//import addJoke from '../__mocks__/addJoke';
import reducer from './jokesReducer';
import {List, Map} from 'immutable';
jest.mock()

describe ('actions', ()=>{
    let initialState;
    beforeAll(()=>{
         initialState =  Map({
            jokes:Map({
              dev:List([]),
              movie:List([]),
              food:List([]),
              celebrity:List([]),
              science:List([]),
              sport:List([]),
              political:List([]),
              religion:List([]),
              animal:List([]),
              history:List([]),
              music:List([]),
              travel:List([]),
              career:List([]),  
              money:List([]),
              fashion:List([])
            }),
            fetching:false,
            fetched:false,
            error:false,
            isFirst:false,
            synced: false
      });
    })
    it('adds a joke', () => {
        const expectedAction = {
            type: "ADD_JOKE",
            payload:new Promise((resolve, reject) => {
                const joke = {
                    category : [category],
                    id:"12"
                }
                resolve(joke.category[0])
        })
        }     
        expect(addJoke("a")).toEqual(expectedAction);
    }) 
    it("gets jokes from store", ()=>{
        const expectedAction = {
            type: "GET_JOKES",
            payload:[]
        }
        expect(getJokesFromStore([])).toEqual(expectedAction);
    })
    it("gets all jokes",()=>{
        const expectedAction = {
            type: "GET_ALL_JOKES",
            payload:[]
        }
        expect(getAllJokes([])).toEqual(expectedAction);
    })
    it('should handle ADD_JOKE_PENDING', () => {
        const startAction = {
          type: "ADD_JOKE_PENDING"
        };
        // it's empty on purpose because it's just starting to fetch posts
        let finalState = initialState.set("fetching",true)
        .set("fetched",false)
        .set("isFirst",false);
        expect(reducer(initialState, startAction)).toEqual(finalState);
      });
    
})