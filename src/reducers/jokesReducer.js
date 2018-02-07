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
      fetched:false
};

export default function jokes(state = initialState, action) {
  switch (action.type) {
    case "ADD_JOKE_PENDING":
        return {...state,
        fetching:true,fetched:false};
    case "ADD_JOKE_FULFILLED":
          const category =action.payload.category[0];
          const currentTime = new Date();
          const posted = currentTime.getHours()+" : "+currentTime.getMinutes();
          const data = {...action.payload,posted}
          return{
            ...state,
            fetching:false,
            fetched:true,
            jokes: {
              ...state.jokes,
              [category]: [...state.jokes[category],data]
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
        return res
      })
    };
  }