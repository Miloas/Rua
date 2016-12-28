import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  const enhancer = composeEnhancers(
    applyMiddleware(
      thunk,
      logger
    )
  );

  return createStore(
    rootReducer,
    enhancer
  );
};
