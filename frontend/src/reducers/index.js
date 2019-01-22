import { combineReducers } from 'redux';
import currentUser from './currentUser';
import isLoading from './isLoading';
import vendors from './vendors';
import transactions from './transactions';

const rootReducer = combineReducers({
  currentUser,
  vendors,
  isLoading,
  transactions,
});

export default rootReducer;
