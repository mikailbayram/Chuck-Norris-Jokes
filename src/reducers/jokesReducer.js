import * as localforage from "localforage";
import {List,Map,fromJS} from 'immutable';

const initialState =  Map({
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
      error:false
});

export default function jokes(state = initialState, action) {
  switch (action.type) {
    case "ADD_JOKE_PENDING":
        return state
        .set("fetching",true)
        .set("fetched",false)
    case "ADD_JOKE_FULFILLED":
          const category =action.payload.category[0];
          const posted = generateDate();
          const times_repeated = timesRepeated([...state.getIn(["jokes",category])],action.payload.id);
          const data = {...action.payload, posted:posted,times_repeated:times_repeated}
          state.getIn(["jokes",category]).map((joke,i)=>{
            if(joke.id==action.payload.id)
              joke.times_repeated=times_repeated;
          })
          return state
          .set("fetching",false)
          .set("fetched",true)
          .updateIn(["jokes",category],arr=>arr.push(data));
          
    case "ADD_JOKE_REJECTED":
           return{
             ...state,
             fetching:false,
             fetched:true,
             error:true
           }
    case "GET_JOKES":
           if(action.payload){
            return state.set("jokes",fromJS(action.payload))}

           return state;
    default:
      return state;
  }
}


export function addJoke(category) {
    return {
      type: "ADD_JOKE",
      payload: fetch("https://api.chucknorris.io/jokes/random?category="+category)
      .then(res=>res.json())
      .then(res=>{
        addJokeToStore(res,category);
        return res
      })
    };
  }
  export function getJokesFromStore(jokes){
    return{
      type: "GET_JOKES",
      payload:jokes
    }
  }

function addJokeToStore(joke,category){
  localforage.getItem("jokes").then((jokes)=>{
    const posted = generateDate();
    const times_repeated = timesRepeated(jokes[category]);
    const data = {...joke,posted,times_repeated:times_repeated}
    localforage.setItem("jokes",{...jokes,[category]:[...jokes[category],data]})
  })
  .catch(()=>{
    localforage.setItem("jokes",initialState.get("jokes").toJS());
  })
}

function timesRepeated(jokes,id){
  const arr = [...jokes];
  let  timesRepeated = 1;
  for(let i = 0 ; i<arr.length; i++){
    if(arr[i].id===id){
      timesRepeated++;
    }
}
return timesRepeated;
}


function generateDate(){
          const currentTime = new Date();
          const date = (currentTime.getDate()>=10?currentTime.getDate():"0"+currentTime.getDate())+"/"+
          ((currentTime.getMonth()+1)>=10?(currentTime.getMonth()+1):"0"+(currentTime.getMonth()+1));
          const posted = date+"   "+(currentTime.getHours()>=10?currentTime.getHours():"0"+currentTime.getHours())+":"
          +(currentTime.getMinutes()>=10?currentTime.getMinutes():"0"+currentTime.getMinutes());
          return posted;
}
