import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginContainer';
import NewProject from './components/PFCAdmin/NewProject';
import ProjectPage from './components/PFCAdmin/ProjectPage';
import AdminDashboard from './components/PFCAdmin/AdminDashboard';
import AdminStakeholder from './components/PFCAdmin/AdminStakeholder';
import AdminNewStakeholder from './components/PFCAdmin/AdminNewStakeholder';
import CreateWastePicker from './components/DWCC/CreateWastePicker';
import CreateExternalDWCC from './components/DWCC/CreateExternalDWCC';
import DwccTransactionHistory from './components/DwccTransactionHistory';
import { get } from './components/utils/requests';
import './common.css';

export default class App extends React.Component {
  componentDidMount() {
    // fetch vendor data
    const vendors = get('/vendors').then(results => {
      console.log(results);
    });
  }

  render() {
    return (
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
          <Route path="/dwcc/transaction-history" component={DwccTransactionHistory} />
        </Switch>
      </Router>
    );
  }
}
