import { connect } from 'react-redux';
import PrivateApp from '../components/PrivateApp';
import { logoutUser } from '../modules/actions';

export default connect(
  () => ({}),
  (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
  }),
)(PrivateApp);
