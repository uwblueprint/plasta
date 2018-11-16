import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import NewProject from './components/PFCAdmin/NewProject';
import ProjectPage from './components/PFCAdmin/ProjectPage';
import Projects from './components/PFCAdmin/Projects';
import AdminStakeholder from './components/PFCAdmin/AdminStakeholder';
import AdminNewStakeholder from './components/PFCAdmin/AdminNewStakeholder';
import CreateWastePicker from './components/DWCC/CreateWastePicker';
import CreateExternalDWCC from './components/DWCC/CreateExternalDWCC';
import DwccTransactionHistory from './components/DwccTransactionHistory';
import DWCCBuyTransaction from './components/DWCC/DWCCBuyTransaction';
import DWCCSellTransaction from './components/DWCC/DWCCSellTransaction';
import { get } from './components/utils/requests';
import { appLoad } from './actions';
import './common.css';

class App extends React.Component {
  componentDidMount() {
    get('/vendors').then(results => {
      this.props.appLoad({ vendors: results.data });
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/landing" component={LandingPage} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/projects/new" component={NewProject} />
          <Route path="/projects/:projectId" component={ProjectPage} />
          <Route path="/admin/stakeholders/new" component={AdminNewStakeholder} />
          <Route path="/admin/stakeholders" component={AdminStakeholder} />
          <Route path="/dwcc/transaction-history" component={DwccTransactionHistory} />
          <Route path="/dwcc/transactions/sell" exact component={DWCCSellTransaction} />
          <Route path="/dwcc/transactions/buy" exact component={DWCCBuyTransaction} />
          <Route path="/dwcc/wastepickers/new" component={CreateWastePicker} />
          <Route path="/dwcc/external-dwcc/new" component={CreateExternalDWCC} />
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  appLoad: payload => dispatch(appLoad(payload)),
});

export default connect(
  null,
  mapDispatchToProps
)(App);
