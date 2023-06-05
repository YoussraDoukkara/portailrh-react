import {
    createTimesheetsRequest, fetchAllTimesheetsRequest
  } from "../api";
  
  export const fetchAllTimesheets = (week) => {
    return async (dispatch) => {
      try {
        const response = await fetchAllTimesheetsRequest(week);
        const { success, data } = response;
        return dispatch({ type: "FETCH_TIMESHEETS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_TIMESHEETS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const createTimesheets = (timesheets) => {
    return async (dispatch) => {
      try {
        const response = await createTimesheetsRequest(timesheets);
        const { success, message } = response;
        return dispatch({ type: "CREATE_TIMESHEETS_SUCCESS", payload: { success, message } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "CREATE_TIMESHEETS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };