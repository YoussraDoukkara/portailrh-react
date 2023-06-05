import {
    fetchAllDesignationsRequest, fetchDesignationsRequest, updateDesignationRequest, createDesignationRequest, deleteDesignationRequest
  } from "../api";
  
  export const fetchAllDesignations = () => {
    return async (dispatch) => {
      try {
        const response = await fetchAllDesignationsRequest();
        const { success, data } = response;
        return dispatch({ type: "FETCH_DESIGNATIONS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_DESIGNATIONS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const fetchDesignations = (currentPage) => {
    return async (dispatch) => {
      try {
        const response = await fetchDesignationsRequest(currentPage);
        const { success, data } = response;
        return dispatch({ type: "FETCH_DESIGNATIONS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_DESIGNATIONS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const createDesignation = (designation) => {
      return async (dispatch) => {
        try {
          const response = await createDesignationRequest(designation);
          const { success, data, message } = response;
          return dispatch({ type: "CREATE_DESIGNATION_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "CREATE_DESIGNATION_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const updateDesignation = (id, designation) => {
      return async (dispatch) => {
        try {
          const response = await updateDesignationRequest(id, designation);
          const { success, data, message } = response;
          return dispatch({ type: "UPDATE_DESIGNATION_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "UPDATE_DESIGNATION_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const deleteDesignation = (id) => {
    return async (dispatch) => {
      try {
        const response = await deleteDesignationRequest(id);
        const { success, message } = response;
        return dispatch({ type: "DELETE_DESIGNATION_SUCCESS", payload: { success, message } });
      } catch (error) {
        const { success, message } = error.response.data;
        return dispatch({
          type: "DELETE_DESIGNATION_FAILURE",
          payload: { success, message },
        });
      }
    };
  };
  