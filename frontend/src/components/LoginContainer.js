import { connect } from 'react-redux';
import { userLogin } from '../actions';
import LoginPage from './LoginPage';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (submittedValues) => dispatch(userLogin(submittedValues.email))
});

export default connect(
  mapDispatchToProps
)(LoginPage);

