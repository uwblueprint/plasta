import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import App from './App';
import { CookiesProvider } from 'react-cookie';

const store = createStore(rootReducer);

render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);
registerServiceWorker();
