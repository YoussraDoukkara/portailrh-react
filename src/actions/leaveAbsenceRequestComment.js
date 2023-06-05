import {
    fetchAllLeaveAbsenceRequestCommentsRequest, fetchLeaveAbsenceRequestCommentsRequest, createLeaveAbsenceRequestCommentRequest
  } from "../api";
  
  export const fetchAllLeaveAbsenceRequestComments = (leaveAbsenceRequestId) => {
    return async (dispatch) => {
      try {
        const response = await fetchAllLeaveAbsenceRequestCommentsRequest(leaveAbsenceRequestId);
        const { success, data } = response;
        return dispatch({ type: "FETCH_LEAVE_ABSENCE_REQUEST_COMMENTS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_LEAVE_ABSENCE_REQUEST_COMMENTS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const fetchLeaveAbsenceRequestComments = (leaveAbsenceRequestId, currentPage) => {
    return async (dispatch) => {
      try {
        const response = await fetchLeaveAbsenceRequestCommentsRequest(leaveAbsenceRequestId, currentPage);
        const { success, data } = response;
        return dispatch({ type: "FETCH_LEAVE_ABSENCE_REQUEST_COMMENTS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_LEAVE_ABSENCE_REQUEST_COMMENTS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const createLeaveAbsenceRequestComment = (leaveAbsenceRequestId, leaveAbsenceRequestComment) => {
      return async (dispatch) => {
        try {
          const response = await createLeaveAbsenceRequestCommentRequest(leaveAbsenceRequestId, leaveAbsenceRequestComment);
          const { success, data, message } = response;
          return dispatch({ type: "CREATE_LEAVE_ABSENCE_REQUEST_COMMENT_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "CREATE_LEAVE_ABSENCE_REQUEST_COMMENT_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  