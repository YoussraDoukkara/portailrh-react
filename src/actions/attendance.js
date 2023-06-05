import {
  fetchAllAttendancesRequest,
  checkInAttendanceRequest,
  checkOutAttendanceRequest,
  breakInAttendanceRequest,
  breakOutAttendanceRequest
} from "../api";

export const fetchAllAttendances = (date) => {
  return async (dispatch) => {
    try {
      const response = await fetchAllAttendancesRequest(date);
      const { success, data } = response;
      return dispatch({ type: "FETCH_ATTENDANCES_SUCCESS", payload: { success, data } });
    } catch (error) {
      const { success, message, errors } = error.response.data;
      return dispatch({
        type: "FETCH_ATTENDANCES_FAILURE",
        payload: { success, message, errors },
      });
    }
  };
};

export const checkInAttendance = () => {
  return async (dispatch) => {
    try {
      const response = await checkInAttendanceRequest();
      const { success, message } = response;
      return dispatch({
        type: "CHECK_IN_ATTENDANCE_SUCCESS",
        payload: { success, message },
      });
    } catch (error) {
      const { success, message } = error.response.data;
      return dispatch({
        type: "CHECK_IN_ATTENDANCE_FAILURE",
        payload: { success, message },
      });
    }
  };
};

export const checkOutAttendance = () => {
  return async (dispatch) => {
    try {
      const response = await checkOutAttendanceRequest();
      const { success, message } = response;
      return dispatch({
        type: "CHECK_OUT_ATTENDANCE_SUCCESS",
        payload: { success, message },
      });
    } catch (error) {
      const { success, message } = error.response.data;
      return dispatch({
        type: "CHECK_OUT_ATTENDANCE_FAILURE",
        payload: { success, message },
      });
    }
  };
};

export const breakInAttendance = () => {
  return async (dispatch) => {
    try {
      const response = await breakInAttendanceRequest();
      const { success, message } = response;
      return dispatch({
        type: "BREAK_IN_ATTENDANCE_SUCCESS",
        payload: { success, message },
      });
    } catch (error) {
      const { success, message } = error.response.data;
      return dispatch({
        type: "BREAK_IN_ATTENDANCE_FAILURE",
        payload: { success, message },
      });
    }
  };
};

export const breakOutAttendance = () => {
  return async (dispatch) => {
    try {
      const response = await breakOutAttendanceRequest();
      const { success, message } = response;
      return dispatch({
        type: "BREAK_OUT_ATTENDANCE_SUCCESS",
        payload: { success, message },
      });
    } catch (error) {
      const { success, message } = error.response.data;
      return dispatch({
        type: "BREAK_OUT_ATTENDANCE_FAILURE",
        payload: { success, message },
      });
    }
  };
};