import { connect } from 'react-redux';
import Register from '../components/Register';
import { registerStart, registerSuccess, registerError } from '../modules/actions';

export default connect(
  ({ register }) => ({ ...register }),
  (dispatch) => ({
    registerStart: () => dispatch(registerStart()),
    registerSuccess: () => dispatch(registerSuccess()),
    registerError: (error) => dispatch(registerError(error)),
  }),
)(Register);
