import { combineReducers } from 'redux';
import currentUser from './currentUser';
import isLoading from './isLoading';
import vendors from './vendors';
import transactions from './transactions';
import headerBar from './headerBar';

const rootReducer = combineReducers({
  currentUser,
  vendors,
  isLoading,
  transactions,
  headerBar,
});

export default rootReducer;
