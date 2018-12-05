import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
import PrimarySegregatorTransactionHistory from './components/PrimarySegregator/PrimarySegregatorTransactionHistory';
import PrimarySegregatorBuyTransaction from './components/PrimarySegregator/PrimarySegregatorBuyTransaction';
import PrimarySegregatorSellTransaction from './components/PrimarySegregator/PrimarySegregatorSellTransaction';
import PrimarySegregatorBottomBar from './components/PrimarySegregator/PrimarySegregatorNavBar.js';
import { get } from './components/utils/requests';
import { appLoad, userAuthentication } from './actions';
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { PrivateRoute } from './components/PrivateRoute';
import './common.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetchingData: true };
    this.redirectUser = this.redirectUser.bind(this);
    this.getVendors = this.getVendors.bind(this);
  }
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  componentDidMount() {
    this.setState({ fetchingData: true });
    this.initializeUser()
      .then(userInitialized => (userInitialized ? this.getVendors() : false))
      .then(() => {
        this.setState({ fetchingData: false });
        this.redirectUser();
      });
  }

  async initializeUser() {
    if (this.props.currentUser || !this.isLoggedIn()) {
      this.setState({ fetchingData: false });
      return this.props.currentUser ? true : false;
    }
    try {
      const user = await get('/user/current', this.props.cookies);
      const userInfo = { userDetails: user.data, userType: user.data.vendor.vendor_type };
      await this.props.userAuthentication(userInfo);
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  redirectUser(props) {
    if (this.state.fetchingData) return null;
    return this.isLoggedIn() ? (
      this.props.currentUser.userType === 'dwcc' ? (
        <Redirect to={{ pathname: '/ps/transaction-history' }} />
      ) : (
        <Redirect to={{ pathname: '/landing' }} />
      )
    ) : (
      <LoginPage cookies={this.props.cookies} {...props} />
    );
  }

  async getVendors() {
    return get('/vendors').then(results => {
      this.props.appLoad({ vendors: results.data });
    });
  }

  isLoggedIn = () => {
    return !!this.props.cookies.get('access_token');
  };

  render() {
    const isDataReady = !this.state.fetchingData;
    const isLoggedIn = this.isLoggedIn();
    return (
      <React.Fragment>
        {this.props.isLoading && <div className="loading-overlay uppercase">Loading...</div>}
        <Router>
          <React.Fragment>
            <Switch>
              <Route path="/" exact render={this.redirectUser} />
              <PrivateRoute
                path="/landing"
                isDataReady={isDataReady}
                isLoggedIn={isLoggedIn}
                component={LandingPage}
              />
              <PrivateRoute
                path="/projects"
                exact
                isDataReady={isDataReady}
                isLoggedIn={isLoggedIn}
                component={Projects}
              />
              <PrivateRoute
                path="/projects/new"
                isDataReady={isDataReady}
                isLoggedIn={isLoggedIn}
                component={NewProject}
              />
              <PrivateRoute
                path="/projects/:projectId"
                isLoggedIn={isLoggedIn}
                isDataReady={isDataReady}
                component={ProjectPage}
              />
              <PrivateRoute
                path="/admin/stakeholders/new"
                isDataReady={isDataReady}
                isLoggedIn={isLoggedIn}
                component={AdminNewStakeholder}
              />
              <PrivateRoute
                path="/admin/stakeholders"
                isDataReady={isDataReady}
                isLoggedIn={isLoggedIn}
                component={AdminStakeholder}
              />
              <PrivateRoute
                path="/ps/transaction-history"
                isDataReady={isDataReady}
                isLoggedIn={isLoggedIn}
                component={PrimarySegregatorTransactionHistory}
              />
              <PrivateRoute
                path="/ps/transactions/sell"
                exact
                isDataReady={isDataReady}
                isLoggedIn={isLoggedIn}
                component={PrimarySegregatorSellTransaction}
              />
              <PrivateRoute
                path="/ps/transactions/buy"
                exact
                isDataReady={isDataReady}
                isLoggedIn={isLoggedIn}
                component={PrimarySegregatorBuyTransaction}
              />
              <PrivateRoute
                path="/ps/wastepickers/new"
                isDataReady={isDataReady}
                isLoggedIn={isLoggedIn}
                component={CreateWastePicker}
              />
              <PrivateRoute
                path="/ps/external-ps/new"
                isDataReady={isDataReady}
                isLoggedIn={isLoggedIn}
                component={CreateExternalPrimarySegregator}
              />
            </Switch>
            {isDataReady &&
              this.props.currentUser.userType === 'dwcc' && <PrimarySegregatorBottomBar />}
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.currentUser,
  isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
  appLoad: payload => dispatch(appLoad(payload)),
  userAuthentication: currentUser => dispatch(userAuthentication(currentUser)),
});

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
