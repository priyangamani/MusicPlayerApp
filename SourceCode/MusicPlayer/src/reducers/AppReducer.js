import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import MusicReducer from './MusicReducer';

const AppReducer = combineReducers({
  nav: NavReducer,
  music:MusicReducer
});

export default AppReducer;