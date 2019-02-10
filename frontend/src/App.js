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
import PSTransactionHistory from './components/PrimarySegregator/PSTransactionHistory';
import PSTransaction from './components/PrimarySegregator/CreatePSTransactionContainer';
import PSNavBar from './components/PrimarySegregator/PSNavBar';
import { get } from './components/utils/requests';
import { loadVendors, authenticateUser, fetchComplete } from './actions';
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { PrivateRoute } from './components/PrivateRoute';
import LogoutButton from './components/common/LogoutButton';
import './common.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.redirectUser = this.redirectUser.bind(this);
    this.getVendors = this.getVendors.bind(this);
  }
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  componentDidMount() {
    this.initializeUser()
      .then(user => {
        if (user) return this.getVendors();
      })
      .then(() => this.props.fetchComplete());
  }

  async initializeUser() {
    if (this.props.currentUser) return this.props.currentUser;
    if (!this.isLoggedIn()) return null;
    try {
      const user = await get('/user/current', this.props.cookies.get('access_token'));
      const userInfo = { userDetails: user.data, userType: user.data.vendor.vendor_type };
      await this.props.authenticateUser(userInfo);
      return userInfo;
    } catch (res) {
      if (res.status === 401) {
        this.props.cookies.remove('access_token');
      } else console.error(res);
      return null;
    }
  }

  redirectUser(props) {
    if (this.props.isLoading) return null;
    if (this.isLoggedIn()) {
      return this.props.currentUser.userType === 'primary_segregator' ? (
        <Redirect to={{ pathname: '/ps/transaction-history' }} />
      ) : (
        <Redirect to={{ pathname: '/landing' }} />
      );
    } else {
      return <LoginPage cookies={this.props.cookies} {...props} />;
    }
  }

  async getVendors() {
    const vendors = await get('/vendors', this.props.cookies.get('access_token'));
    return this.props.loadVendors(vendors.data);
  }

  isLoggedIn = () => {
    return !!this.props.cookies.get('access_token');
  };

  render() {
    const isDataReady = !this.props.isLoading;
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
                component={PSTransactionHistory}
              />
              <PrivateRoute
                path="/ps/transactions/:transactionType"
                isDataReady={isDataReady}
                isLoggedIn={isLoggedIn}
                component={PSTransaction}
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
            {this.props.currentUser && <LogoutButton cookies={this.props.cookies} />}
            {this.props.currentUser &&
              this.props.currentUser.userType === 'primary_segregator' && <PSNavBar />}
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  isLoading: state.isLoading,
  vendors: state.vendors,
});

const mapDispatchToProps = dispatch => ({
  loadVendors: payload => dispatch(loadVendors(payload)),
  authenticateUser: currentUser => dispatch(authenticateUser(currentUser)),
  fetchComplete: () => dispatch(fetchComplete()),
});

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
