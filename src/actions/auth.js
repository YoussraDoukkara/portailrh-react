import { loginRequest, logoutRequest, sendRequest, resetRequest } from '../api';

export function login(email, password) {
  return async dispatch => {
    try {
      const response = await loginRequest(email, password);
      const { success, data, errors, message } = response;

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return dispatch({ type: 'LOGIN_SUCCESS', payload: { success, data, errors, message } });
    } catch (error) {
      const { success, message, errors } = error.response.data;
      return dispatch({ type: 'LOGIN_FAILURE', payload: { success, message, errors } });
    }
  };
}

export function logout() {
  return async dispatch => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    try {
      const response = await logoutRequest();
      const { success, message } = response;
      return dispatch({ type: 'LOGOUT_SUCCESS', payload: { success, message } });
    } catch (error) {
      const { success, errors } = error.response.data;
      return dispatch({ type: 'LOGOUT_FAILURE', payload: { success, errors } });
    }
  };
}

export function send(email) {
  return async dispatch => {
    try {
      const response = await sendRequest(email);
      const { success, data, errors, message } = response;

      return dispatch({ type: 'SEND_SUCCESS', payload: { success, data, errors, message } });
    } catch (error) {
      const { success, message, errors } = error.response.data;
      return dispatch({ type: 'SEND_FAILURE', payload: { success, message, errors } });
    }
  };
}

export function reset(token, email, password, passwordConfirmation) {
  return async dispatch => {
    try {
      const response = await resetRequest(token, email, password, passwordConfirmation);
      const { success, data, errors, message } = response;

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return dispatch({ type: 'RESET_SUCCESS', payload: { success, data, errors, message } });
    } catch (error) {
      const { success, message, errors } = error.response.data;
      return dispatch({ type: 'RESET_FAILURE', payload: { success, message, errors } });
    }
  };
}
