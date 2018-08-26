import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './index';

export const loginStart = () => ({ type: LOGIN_REQUEST });

export const loginSuccess = (data) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_SUCCESS });
    dispatch(reset('loginForm'));
    localStorage.setItem('express_mongodb_graphql_react_token', JSON.stringify(data.login.token));
    dispatch(push('/'));
    toastr.success(`Welcome ${data.user.username}!`);
  };
};

export const loginError = (error) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_ERROR,
      error,
    });
    toastr.error(error.message);
  };
};
