import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import rootReducer from './reducers';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App} />
        {/* add routes here */}
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
