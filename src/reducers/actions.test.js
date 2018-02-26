import {addJoke} from './jokesReducer';
//import addJoke from '../__mocks__/addJoke';
jest.mock()

describe ('actions', ()=>{
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
})