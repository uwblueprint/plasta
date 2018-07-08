import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginContainer';
import SearchSelect from './components/input-components/SearchSelect';
import DynamicForm from './components/input-components/DynamicForm';
import NewProject from './components/NewProject';
import './common.css';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/landing" component={LandingPage} />
        <Route path="/search" component={SearchSelect} />
        <Route path="/dynamic" component={DynamicForm} />
        <Route path="/newproject" component={NewProject} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
