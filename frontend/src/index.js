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
import ProjectPage from './components/ProjectPage';
import AdminDashboard from './components/AdminDashboard';
import AdminStakeholder from './components/AdminStakeholder';
import AdminNewStakeholder from './components/AdminNewStakeholder';
import CreateWastePicker from './components/CreateWastePicker';
import CreateExternalDWCC from './components/CreateExternalDWCC';
import './common.css';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/landing" component={LandingPage} />
        <Route path="/admindash" component={AdminDashboard} />
        <Route path="/projects/new" component={NewProject} />
        <Route path="/projects/:projectId" component={ProjectPage} />
        <Route path="/admin/stakeholders/new" component={AdminNewStakeholder} />
        <Route path="/admin/stakeholders" component={AdminStakeholder} />
        <Route path="/dwcc/wastepickers/new" component={CreateWastePicker} />
        <Route path="/dwcc/external-dwcc/new" component={CreateExternalDWCC} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
