import {
    fetchDataRequest
  } from "../api";
  
  export const fetchData = () => {
    return async (dispatch) => {
      try {
        const response = await fetchDataRequest();
        const { success, data } = response;
        return dispatch({ type: "FETCH_DATA_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_DATA_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };