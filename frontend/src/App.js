import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import NewProject from './components/PFCAdmin/NewProject';
import ProjectPage from './components/PFCAdmin/ProjectPage';
import AdminDashboard from './components/PFCAdmin/AdminDashboard';
import AdminStakeholder from './components/PFCAdmin/AdminStakeholder';
import AdminNewStakeholder from './components/PFCAdmin/AdminNewStakeholder';
import CreateWastePicker from './components/DWCC/CreateWastePicker';
import CreateExternalDWCC from './components/DWCC/CreateExternalDWCC';
import DwccTransactionHistory from './components/DwccTransactionHistory';
import { get } from './components/utils/requests';
import { appLoad } from './actions';
import './common.css';

class App extends React.Component {
  componentDidMount() {
    get('/vendors').then(results => {
      this.props.onLoad({ vendors: results.data });
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

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch(appLoad(payload)),
});

export default connect(
  null,
  mapDispatchToProps
)(App);
