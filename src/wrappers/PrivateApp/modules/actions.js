import { toastr } from 'react-redux-toastr';
import { LOGOUT_SUCCESS } from '../../../routes/Login/modules';

export const logoutUser = () => (
  (dispatch) => {
    localStorage.removeItem('express_mongodb_graphql_react_token');
    dispatch({ type: LOGOUT_SUCCESS });
    toastr.success('User logout');
  }
);
