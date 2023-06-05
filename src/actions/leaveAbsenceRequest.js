import {
    fetchAllLeaveAbsenceRequestsRequest, fetchLeaveAbsenceRequestsRequest, fetchLeaveAbsenceRequestRequest, updateLeaveAbsenceRequestRequest, createLeaveAbsenceRequestRequest, deleteLeaveAbsenceRequestRequest, approveLeaveAbsenceRequestRequest, rejectLeaveAbsenceRequestRequest
  } from "../api";
  
  export const fetchAllLeaveAbsenceRequests = () => {
    return async (dispatch) => {
      try {
        const response = await fetchAllLeaveAbsenceRequestsRequest();
        const { success, data } = response;
        return dispatch({ type: "FETCH_LEAVE_ABSENCE_REQUESTS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_LEAVE_ABSENCE_REQUESTS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const fetchLeaveAbsenceRequests = (currentPage) => {
    return async (dispatch) => {
      try {
        const response = await fetchLeaveAbsenceRequestsRequest(currentPage);
        const { success, data } = response;
        return dispatch({ type: "FETCH_LEAVE_ABSENCE_REQUESTS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_LEAVE_ABSENCE_REQUESTS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const fetchLeaveAbsenceRequest = (currentPage) => {
    return async (dispatch) => {
      try {
        const response = await fetchLeaveAbsenceRequestRequest(currentPage);
        const { success, data } = response;
        return dispatch({ type: "FETCH_LEAVE_ABSENCE_REQUEST_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_LEAVE_ABSENCE_REQUEST_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const createLeaveAbsenceRequest = (leaveAbsenceRequest) => {
      return async (dispatch) => {
        try {
          const response = await createLeaveAbsenceRequestRequest(leaveAbsenceRequest);
          const { success, data, message } = response;
          return dispatch({ type: "CREATE_LEAVE_ABSENCE_REQUEST_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "CREATE_LEAVE_ABSENCE_REQUEST_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const updateLeaveAbsenceRequest = (id, leaveAbsenceRequest) => {
      return async (dispatch) => {
        try {
          const response = await updateLeaveAbsenceRequestRequest(id, leaveAbsenceRequest);
          const { success, data, message } = response;
          return dispatch({ type: "UPDATE_LEAVE_ABSENCE_REQUEST_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "UPDATE_LEAVE_ABSENCE_REQUEST_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
    export const deleteLeaveAbsenceRequest = (id) => {
      return async (dispatch) => {
        try {
          const response = await deleteLeaveAbsenceRequestRequest(id);
          const { success, message } = response;
          return dispatch({ type: "DELETE_LEAVE_ABSENCE_REQUEST_SUCCESS", payload: { success, message } });
        } catch (error) {
          const { success, message } = error.response.data;
          return dispatch({
            type: "DELETE_LEAVE_ABSENCE_REQUEST_FAILURE",
            payload: { success, message },
          });
        }
      };
    };
  
    export const approveLeaveAbsenceRequest = (id) => {
      return async (dispatch) => {
        try {
          const response = await approveLeaveAbsenceRequestRequest(id);
          const { success, message } = response;
          return dispatch({ type: "APPROVE_LEAVE_ABSENCE_REQUEST_SUCCESS", payload: { success, message } });
        } catch (error) {
          const { success, message } = error.response.data;
          return dispatch({
            type: "APPROVE_LEAVE_ABSENCE_REQUEST_FAILURE",
            payload: { success, message },
          });
        }
      };
    };
  
    export const rejectLeaveAbsenceRequest = (id) => {
      return async (dispatch) => {
        try {
          const response = await rejectLeaveAbsenceRequestRequest(id);
          const { success, message } = response;
          return dispatch({ type: "REJECT_LEAVE_ABSENCE_REQUEST_SUCCESS", payload: { success, message } });
        } catch (error) {
          const { success, message } = error.response.data;
          return dispatch({
            type: "REJECT_LEAVE_ABSENCE_REQUEST_FAILURE",
            payload: { success, message },
          });
        }
      };
    };
  