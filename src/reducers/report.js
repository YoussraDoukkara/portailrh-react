const initialState = {
  success: false,
  data: null,
  message: null,
  errors: [],
};

export default function reportReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_REPORTS_SUCCESS":
    case "FETCH_REPORT_DOWNLOAD_SUCCESS":
      return {
        ...state,
        success: action.payload.success,
        data: action.payload.data,
        message: null,
        errors: [],
      };

    case "FETCH_REPORTS_FAILURE":
    case "FETCH_REPORT_DOWNLOAD_FAILURE":
      return {
        ...state,
        success: action.payload.success,
        data: null,
        message: action.payload.message,
        errors: action.payload.errors,
      };

    default:
      return state;
  }
}
