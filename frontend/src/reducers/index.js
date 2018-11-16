import { combineReducers } from 'redux';
import currentUser from './currentUser';
import vendors from './vendors';

const rootReducer = combineReducers({
  currentUser,
  vendors,
});

export default rootReducer;
