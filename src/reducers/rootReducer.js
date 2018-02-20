import {combineReducers} from 'redux';
import jokes from './jokesReducer';

const rootReducer = combineReducers({
  jokes,
});

export default rootReducer;