// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { downloads, visibilityFilter } from './reducers';

const rootReducer = combineReducers({
  downloads,
  visibilityFilter,
  routing
});

export default rootReducer;
