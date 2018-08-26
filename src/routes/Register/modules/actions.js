import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './index';

export const registerStart = () => ({ type: REGISTER_REQUEST });

export const registerSuccess = () => {
  return (dispatch) => {
    dispatch({ type: REGISTER_SUCCESS });
    dispatch(reset('registerForm'));
    dispatch(push('/login'));
    toastr.success('User registered successfully');
  };
};

export const registerError = (error) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_ERROR,
      error,
    });
    toastr.error(error.message);
  };
};
