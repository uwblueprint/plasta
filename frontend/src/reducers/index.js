import { combineReducers } from 'redux';
import currentUser from './currentUser';
import isLoading from './isLoading';
import vendors from './vendors';

const rootReducer = combineReducers({
  currentUser,
  vendors,
  isLoading,
});

export default rootReducer;
