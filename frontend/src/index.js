import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginContainer';
import NewProject from './components/NewProject';
import AdminDashboard from './components/AdminDashboard';
import AdminStakeholder from './components/AdminStakeholder';
import AdminNewStakeholder from './components/AdminNewStakeholder';
import './common.css';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/landing" component={LandingPage} />
        <Route path="/admindash" component={AdminDashboard} />
        <Route path="/newproject" component={NewProject} />
        <Route path="/admin/stakeholders/new" component={AdminNewStakeholder} />
        <Route path="/admin/stakeholders" component={AdminStakeholder} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
