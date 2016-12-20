// @flow
import { combineReducers } from 'redux';
import { downloads, visibilityFilter } from './reducers';

const rootReducer = combineReducers({
  downloads,
  visibilityFilter
});

export default rootReducer;
