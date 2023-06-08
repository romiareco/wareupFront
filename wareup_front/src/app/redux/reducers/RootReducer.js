import { combineReducers } from 'redux';
import EcommerceReducer from './EcommerceReducer';
import NavigationReducer from './NavigationReducer';

const RootReducer = combineReducers({
  navigations: NavigationReducer,
  ecommerce: EcommerceReducer,
});

export default RootReducer;
