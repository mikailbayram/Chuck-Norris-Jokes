import * as localforage from "localforage";

const initialState =  {
      jokes:{
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
        fashion:[]
      },
      fetching:false,
      fetched:false,
      error:false
};

export default function jokes(state = initialState, action) {
  switch (action.type) {
    case "ADD_JOKE_PENDING":
        return {...state,
        fetching:true,fetched:false};
    case "ADD_JOKE_FULFILLED":
          const category =action.payload.category[0];
          const isRepeated = checkIfStored(state.jokes[category],action.payload.id);
          const posted = generateDate();
          const data = {...action.payload,posted:posted,times_repeated:isRepeated.timesRepeated};
          return{
            ...state,
            fetching:false,
            fetched:true,
            jokes: {
              ...state.jokes,
              [category]: [...isRepeated.arr,data]
            }           
           }
    case "ADD_JOKE_REJECTED":
           return{
             ...state,
             fetching:false,
             fetched:true,
             error:true
           }
    case "GET_JOKES":
           return{
             ...state,jokes:action.payload
           }
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
          const isRepeated = checkIfStored(jokes[category],joke.id);
          const data = {...joke,posted,times_repeated:isRepeated.timesRepeated}
          localforage.setItem("jokes",{...jokes,[category]:[...jokes[category],data]})
    }).catch(()=>{
      localforage.setItem("jokes",{...initialState.jokes,[category]:[...initialState.jokes[category],joke]})
      .then(res=>console.log(res))
    })
}

function generateDate(){
          const currentTime = new Date();
          const date = (currentTime.getDate()>=10?currentTime.getDate():"0"+currentTime.getDate())+"/"+
          ((currentTime.getMonth()+1)>=10?(currentTime.getMonth()+1):"0"+(currentTime.getMonth()+1));
          const posted = date+"   "+(currentTime.getHours()>=10?currentTime.getHours():"0"+currentTime.getHours())+":"
          +(currentTime.getMinutes()>=10?currentTime.getMinutes():"0"+currentTime.getMinutes());
          return posted;
}
function checkIfStored(arr,id){
  let timesRepeated = 0;
  for(let i = 0 ; i<arr.length; i++){
    if(arr[i].id===id){
      timesRepeated++;
    }
  }
  for(let i = 0 ; i<arr.length; i++){
    if(arr[i].id===id){
      arr[i].times_repeated=timesRepeated+1;
    }
  }
  const result = {
    arr:arr,
    timesRepeated:timesRepeated+1
  }
  return result;
}