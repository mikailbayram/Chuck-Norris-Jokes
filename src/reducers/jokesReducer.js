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
      error:false,
      isFirst:false,
      synced: false
});

export default function jokes(state = initialState, action) {
  switch (action.type) {
    case "ADD_JOKE_PENDING":
        return state
        .set("fetching",true)
        .set("fetched",false)
        .set("isFirst",false)
    case "ADD_JOKE_FULFILLED":
          const category =action.payload.category[0];
          const posted = generateDate();
          const times_repeated = timesRepeated(state.getIn(["jokes",category]),action.payload.id);
          const data = {...action.payload, posted:posted,times_repeated:times_repeated};
          addJokeToStore(data,category,times_repeated);
          const updated = state.getIn(["jokes",category]).map((item)=> {
            if(item.get("id") === action.payload.id) {
              return item.set("times_repeated", times_repeated);
            } else {
              return item;
            }
          })
          return state
          .setIn(["jokes",category],updated)
          .set("fetching",false)
          .set("fetched",true)
          .set("isFirst",times_repeated===1?true:false)
          .updateIn(["jokes",category],arr=>arr.push(fromJS(data)))
          
    case "ADD_JOKE_REJECTED":
           return state
           .set("fetching",false)
           .set("fetched",true)
           .set("error",true)
    case "GET_JOKES":
           if(action.payload){
            return state.set("jokes",fromJS(action.payload))}

           return state;
    case "GET_ALL_JOKES":
            const categories= state.get("jokes").keySeq().toList();
            const result = {
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
              fashion:[]};
            for(let i = 0; i<categories.count();i++){
              for(let j = 0; j<action.payload[categories.get(i)].length;j++){
                let found = false;
                for(let k = 0; k<state.getIn(["jokes",categories.get(i)]).count();k++){
                  if(action.payload[categories.get(i)][j].id===state.getIn(["jokes",categories.get(i),k,"id"])){
                    found = true;
                    break;
                  }
                }
                if(!found){
                  result[categories.get(i)].push(action.payload[categories.get(i)][j]);
                }
              }
            }
            const update = state.get("jokes").map((category,i)=>{
              return category.concat(fromJS(result[i]));
            })
            
            return state.set("synced",true)
            .set("jokes",update);
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

  export function getAllJokes(jokes){
    return {
      type: "GET_ALL_JOKES",
      payload:jokes
    }
  }

function addJokeToStore(joke,category,times_repeated){
  localforage.getItem("jokes").then((jokes)=>{
    const arr = [...jokes[category]];
    for(let i = 0; i<arr.length;i++){
      if(arr[i].id===joke.id)
        arr[i].times_repeated = times_repeated;
    }
    localforage.setItem("jokes",{...jokes,[category]:[...jokes[category],joke]})
  })
  .catch(()=>{
    localforage.setItem("jokes",initialState.get("jokes").toJS());
  })
}

function timesRepeated(jokes,id){
  let  timesRepeated = 1;
  for(let i = 0 ; i<jokes.count(); i++){
    if(jokes.get(i).get("id")===id){
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
