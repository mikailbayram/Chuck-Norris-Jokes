import {combineReducers} from 'redux';
import jokes from './jokesReducer';
import editedJokes from './editedJokes';

const rootReducer = combineReducers({
  jokes:jokes,
  editedJokes:editedJokes
});

export default rootReducer;