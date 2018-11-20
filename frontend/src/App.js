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
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { PrivateRoute } from './components/utils/private-route';
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

  isLoggedIn = () => !!this.props.cookies.get('access_token');

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={() => <LoginPage cookies={this.props.cookies} />} />
          <PrivateRoute path="/landing" isLoggedIn={this.isLoggedIn()} component={LandingPage} />
          <PrivateRoute
            path="/projects"
            exact
            isLoggedIn={this.isLoggedIn()}
            component={Projects}
            onEnter={this.requireAuth}
          />
          <PrivateRoute
            path="/projects/new"
            isLoggedIn={this.isLoggedIn()}
            component={NewProject}
          />
          <PrivateRoute
            path="/projects/:projectId"
            isLoggedIn={this.isLoggedIn()}
            component={ProjectPage}
          />
          <PrivateRoute
            path="/admin/stakeholders/new"
            isLoggedIn={this.isLoggedIn()}
            component={AdminNewStakeholder}
          />
          <PrivateRoute
            path="/admin/stakeholders"
            isLoggedIn={this.isLoggedIn()}
            component={AdminStakeholder}
          />
          <PrivateRoute
            path="/dwcc/transaction-history"
            isLoggedIn={this.isLoggedIn()}
            component={DwccTransactionHistory}
          />
          <PrivateRoute
            path="/dwcc/transactions/sell"
            exact
            isLoggedIn={this.isLoggedIn()}
            component={DWCCSellTransaction}
          />
          <PrivateRoute
            path="/dwcc/transactions/buy"
            exact
            isLoggedIn={this.isLoggedIn()}
            component={DWCCBuyTransaction}
          />
          <PrivateRoute
            path="/dwcc/wastepickers/new"
            isLoggedIn={this.isLoggedIn()}
            component={CreateWastePicker}
          />
          <PrivateRoute
            path="/dwcc/external-dwcc/new"
            isLoggedIn={this.isLoggedIn()}
            component={CreateExternalDWCC}
          />
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
