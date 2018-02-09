const initialState =  {
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
};

export default function jokes(state = initialState, action) {
    switch (action.type) {
      case "ADD_EDITED_JOKE":
      return{
          ...state,
          [action.payload.category[0]]:[...state[action.payload.category[0]],action.payload]
      }
      default:
        return state;
    }
  }

  export function addEditedJoke(joke){
      return{
          type: "ADD_EDITED_JOKE",
          payload:joke
      }
  }