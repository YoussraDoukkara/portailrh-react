import {
    fetchAllTimesRequest, fetchTimesRequest, updateTimeRequest, createTimeRequest, deleteTimeRequest
  } from "../api";
  
  export const fetchAllTimes = () => {
    return async (dispatch) => {
      try {
        const response = await fetchAllTimesRequest();
        const { success, data } = response;
        return dispatch({ type: "FETCH_TIMES_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_TIMES_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const fetchTimes = (currentPage) => {
    return async (dispatch) => {
      try {
        const response = await fetchTimesRequest(currentPage);
        const { success, data } = response;
        return dispatch({ type: "FETCH_TIMES_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_TIMES_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const createTime = (time) => {
      return async (dispatch) => {
        try {
          const response = await createTimeRequest(time);
          const { success, data, message } = response;
          return dispatch({ type: "CREATE_TIME_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "CREATE_TIME_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const updateTime = (id, time) => {
      return async (dispatch) => {
        try {
          const response = await updateTimeRequest(id, time);
          const { success, data, message } = response;
          return dispatch({ type: "UPDATE_TIME_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "UPDATE_TIME_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const deleteTime = (id) => {
    return async (dispatch) => {
      try {
        const response = await deleteTimeRequest(id);
        const { success, message } = response;
        return dispatch({ type: "DELETE_TIME_SUCCESS", payload: { success, message } });
      } catch (error) {
        const { success, message } = error.response.data;
        return dispatch({
          type: "DELETE_TIME_FAILURE",
          payload: { success, message },
        });
      }
    };
  };
  