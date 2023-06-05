import {
  fetchAllUsersRequest,
  fetchUsersRequest,
  updateUserRequest,
  createUserRequest,
  deleteUserRequest
} from "../api";

export const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await fetchAllUsersRequest();
      const { success, data } = response;
      return dispatch({
        type: "FETCH_USERS_SUCCESS",
        payload: { success, data },
      });
    } catch (error) {
      const { success, message, errors } = error.response.data;
      return dispatch({
        type: "FETCH_USERS_FAILURE",
        payload: { success, message, errors },
      });
    }
  };
};

export const fetchUsers = (currentPage) => {
  return async (dispatch) => {
    try {
      const response = await fetchUsersRequest(currentPage);
      const { success, data } = response;
      return dispatch({
        type: "FETCH_USERS_SUCCESS",
        payload: { success, data },
      });
    } catch (error) {
      const { success, message, errors } = error.response.data;
      return dispatch({
        type: "FETCH_USERS_FAILURE",
        payload: { success, message, errors },
      });
    }
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await createUserRequest(user);
      const { success, data, message } = response;
      return dispatch({
        type: "CREATE_USER_SUCCESS",
        payload: { success, data, message },
      });
    } catch (error) {
      const { success, message, errors } = error.response.data;
      return dispatch({
        type: "CREATE_USER_FAILURE",
        payload: { success, message, errors },
      });
    }
  };
};

export const updateUser = (id, user) => {
  return async (dispatch) => {
    try {
      const response = await updateUserRequest(id, user);
      const { success, data, message } = response;
      return dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: { success, data, message },
      });
    } catch (error) {
      const { success, message, errors } = error.response.data;
      return dispatch({
        type: "UPDATE_USER_FAILURE",
        payload: { success, message, errors },
      });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await deleteUserRequest(id);
      const { success, message } = response;
      return dispatch({
        type: "DELETE_USER_SUCCESS",
        payload: { success, message },
      });
    } catch (error) {
      const { success, message } = error.response.data;
      return dispatch({
        type: "DELETE_USER_FAILURE",
        payload: { success, message },
      });
    }
  };
};
