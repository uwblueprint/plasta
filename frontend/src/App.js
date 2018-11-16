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
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import './common.css';

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  componentDidMount() {
    get('/vendors').then(results => {
      this.props.appLoad({ vendors: results.data });
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={() => <LoginPage cookies={this.props.cookies} />} />
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

const mapStateToProps = (state, ownProps) => {
  return {
    state: state,
    cookies: ownProps.cookies,
  };
};

const mapDispatchToProps = dispatch => ({
  appLoad: payload => dispatch(appLoad(payload)),
});

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withCookies(AppContainer);
