import * as localforage from 'localforage';
import store from './store/configureStore'
import {getAllJokes} from './reducers/jokesReducer'

const jokes = {
    explicit:[],
    dev:[],
    movie:[],
    food:[],
    celebrity:[],
    science:[],
    sport:[],
    political:[],
    religion:[],
    animal:[],
    history:[],
    music:[],
    travel:[],
    career:[],  
    money:[],
    fashion:[],
    other:[]
}

export default function getJokes(){
    const chuck = fetch("https://api.chucknorris.io/jokes/search?query=chuck").then(res=>res.json())
    const joke = fetch("https://api.chucknorris.io/jokes/search?query=joke").then(res=>res.json())
    Promise.all([chuck,joke]).then((values)=> {
        values[1].result.map((item)=>{
            if(item.category)
                jokes[item.category].push(item);
            else
                jokes.other.push(item);
        })
        values[0].result.map((item)=>{
            if(item.category)
                jokes[item.category].push(item);
            else
                jokes.other.push(item);
        })
        localforage.getItem("allJokes").then((joke)=>{
            if(!joke){
                localforage.setItem("allJokes",jokes);
                store.dispatch(getAllJokes());
            }
            else store.dispatch(getAllJokes(jokes));
          })
      });
}
