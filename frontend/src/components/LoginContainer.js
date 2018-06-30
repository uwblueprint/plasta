import { connect } from 'react-redux';
import { userLogin } from '../actions';
import LoginPage from './LoginPage';

const mapStateToProps = state => ({
  userEmail: state.userEmail,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: submittedValues => dispatch(userLogin(submittedValues.email)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
