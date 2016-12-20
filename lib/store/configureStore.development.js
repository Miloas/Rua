import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';

export default () => {
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  const enhancer = compose(
    applyMiddleware(
      thunk,
      logger
    ),
    window.devToolsExtension()
  );

  return createStore(
    rootReducer,
    enhancer
  );
};
