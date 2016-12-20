// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import HomePage from './containers/HomePage';

const store = configureStore();

const app = render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.getElementById('root')
)
