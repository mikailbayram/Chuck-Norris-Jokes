import * as localforage from "localforage";

const initialState =  {
      jokes:{
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
          const currentTime = new Date();
          const date = (currentTime.getDate()>=10?currentTime.getDate():"0"+currentTime.getDate())+"/"+
          ((currentTime.getMonth()+1)>=10?(currentTime.getMonth()+1):"0"+(currentTime.getMonth()+1));
          const posted = date+"   "+(currentTime.getHours()>=10?currentTime.getHours():"0"+currentTime.getHours())+":"
          +(currentTime.getMinutes()>=10?currentTime.getMinutes():"0"+currentTime.getMinutes());
          const data = {...action.payload,posted};
          return{
            ...state,
            fetching:false,
            fetched:true,
            jokes: {
              ...state.jokes,
              [category]: [...state.jokes[category],data]
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
           if(action.payload)
           return{
             ...state,jokes:action.payload
           }
           else{
             return{
               ...initialState
             }
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
          const currentTime = new Date();
          const date = (currentTime.getDate()>=10?currentTime.getDate():"0"+currentTime.getDate())+"/"+
          ((currentTime.getMonth()+1)>=10?(currentTime.getMonth()+1):"0"+(currentTime.getMonth()+1));
          const posted = date+"   "+(currentTime.getHours()>=10?currentTime.getHours():"0"+currentTime.getHours())+":"
          +(currentTime.getMinutes()>=10?currentTime.getMinutes():"0"+currentTime.getMinutes());
          const data = {...joke,posted}
          localforage.setItem("jokes",{...jokes,[category]:[...jokes[category],data]})
          .then(res=>console.log(res))
    }).catch(()=>{
      localforage.setItem("jokes",{...initialState.jokes,[category]:[...initialState.jokes[category],joke]})
      .then(res=>console.log(res))
    })
}