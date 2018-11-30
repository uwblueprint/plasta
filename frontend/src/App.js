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
import CreateWastePicker from './components/PrimarySegregator/CreateWastePicker';
import CreateExternalPrimarySegregator from './components/PrimarySegregator/CreateExternalPrimarySegregator';
import PrimarySegregatorTransactionHistory from './components/PrimarySegregatorTransactionHistory';
import PrimarySegregatorBuyTransaction from './components/PrimarySegregator/PrimarySegregatorBuyTransaction';
import PrimarySegregatorSellTransaction from './components/PrimarySegregator/PrimarySegregatorSellTransaction';
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
    if (!this.isLoggedIn()) return;
    // TODO: GET USER OBJECT FROM ACCESS TOKEN AND PUT IN STORE
    get('/vendors').then(results => {
      this.props.appLoad({ vendors: results.data });
    });
  }

  isLoggedIn = () => !!this.props.cookies.get('access_token');

  render() {
    const isLoggedIn = this.isLoggedIn();
    return (
      <React.Fragment>
        {this.props.isLoading && <div className="loading-overlay uppercase">Loading...</div>}
        <Router>
          <Switch>
            <Route path="/" exact render={() => <LoginPage cookies={this.props.cookies} />} />
            <PrivateRoute path="/landing" isLoggedIn={isLoggedIn} component={LandingPage} />
            <PrivateRoute
              path="/projects"
              exact
              isLoggedIn={isLoggedIn}
              component={Projects}
              onEnter={this.requireAuth}
            />
            <PrivateRoute path="/projects/new" isLoggedIn={isLoggedIn} component={NewProject} />
            <PrivateRoute
              path="/projects/:projectId"
              isLoggedIn={isLoggedIn}
              component={ProjectPage}
            />
            <PrivateRoute
              path="/admin/stakeholders/new"
              isLoggedIn={isLoggedIn}
              component={AdminNewStakeholder}
            />
            <PrivateRoute
              path="/admin/stakeholders"
              isLoggedIn={isLoggedIn}
              component={AdminStakeholder}
            />
            <PrivateRoute
              path="/ps/transaction-history"
              isLoggedIn={isLoggedIn}
              component={PrimarySegregatorTransactionHistory}
            />
            <PrivateRoute
              path="/ps/transactions/sell"
              exact
              isLoggedIn={isLoggedIn}
              component={PrimarySegregatorSellTransaction}
            />
            <PrivateRoute
              path="/ps/transactions/buy"
              exact
              isLoggedIn={isLoggedIn}
              component={PrimarySegregatorBuyTransaction}
            />
            <PrivateRoute
              path="/ps/wastepickers/new"
              isLoggedIn={this.isLoggedIn()}
              component={CreateWastePicker}
            />
            <PrivateRoute
              path="/ps/external-ps/new"
              isLoggedIn={this.isLoggedIn()}
              component={CreateExternalPrimarySegregator}
            />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.currentUser,
    cookies: ownProps.cookies,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  appLoad: payload => dispatch(appLoad(payload)),
});

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
