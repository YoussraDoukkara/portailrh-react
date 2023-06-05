import {
    fetchAllReportsRequest, fetchReportDownloadRequest
  } from "../api";
  
  export const fetchAllReports = (date, status) => {
    return async (dispatch) => {
      try {
        const response = await fetchAllReportsRequest(date, status);
        const { success, data } = response;
        return dispatch({ type: "FETCH_REPORTS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_REPORTS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const fetchReportDownload = (date) => {
    return async (dispatch) => {
      try {
        const response = await fetchReportDownloadRequest(date);
        const { success, data } = response;
        return dispatch({ type: "FETCH_REPORT_DOWNLOAD_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_REPORT_DOWNLOAD_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };