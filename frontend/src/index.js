import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginContainer';
import './common.css';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/landing" component={LandingPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
