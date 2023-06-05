const initialState = {
    success: false,
    data: null,
    message: null,
    errors: [],
  };

  export default function leaveAbsenceRequestCommentReducer(state = initialState, action) {
    switch (action.type) {
      case "FETCH_LEAVE_ABSENCE_REQUEST_COMMENTS_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "CREATE_LEAVE_ABSENCE_REQUEST_COMMENT_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_LEAVE_ABSENCE_REQUEST_COMMENTS_FAILURE":
      case "CREATE_LEAVE_ABSENCE_REQUEST_COMMENT_FAILURE":
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
  