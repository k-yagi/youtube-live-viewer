import React from 'react';
import { Provider } from 'react-redux';
import createStore from './src/store';

const store = createStore();

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      {element}
    </Provider>
  )
}
