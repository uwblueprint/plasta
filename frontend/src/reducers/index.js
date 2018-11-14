import { combineReducers } from 'redux';
import userObject from './userObject';
import vendors from './vendors';

const rootReducer = combineReducers({
  userObject,
  vendors,
});

export default rootReducer;
