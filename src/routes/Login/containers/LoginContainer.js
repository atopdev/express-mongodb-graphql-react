import { connect } from 'react-redux';
import Login from '../components/Login';
import { loginStart, loginSuccess, loginError } from '../modules/actions';

export default connect(
  ({ auth }) => ({ ...auth }),
  (dispatch) => ({
    loginStart: () => dispatch(loginStart()),
    loginSuccess: (data) => dispatch(loginSuccess(data)),
    loginError: (error) => dispatch(loginError(error)),
  }),
)(Login);
