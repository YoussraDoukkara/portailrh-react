const initialState = {
    success: false,
    data: null,
    message: null,
    errors: [],
  };

  export default function leaveAbsenceRequestReducer(state = initialState, action) {
    switch (action.type) {
      case "FETCH_LEAVE_ABSENCE_REQUESTS_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "CREATE_LEAVE_ABSENCE_REQUEST_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_LEAVE_ABSENCE_REQUEST_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "UPDATE_LEAVE_ABSENCE_REQUEST_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "DELETE_LEAVE_ABSENCE_REQUEST_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: null,
          message: action.payload.message,
          errors: [],
        };
  
      case "APPROVE_LEAVE_ABSENCE_REQUEST_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: null,
          message: action.payload.message,
          errors: [],
        };
  
      case "REJECT_LEAVE_ABSENCE_REQUEST_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: null,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_LEAVE_ABSENCE_REQUESTS_FAILURE":
      case "CREATE_LEAVE_ABSENCE_REQUEST_FAILURE":
      case "FETCH_LEAVE_ABSENCE_REQUEST_FAILURE":
      case "UPDATE_LEAVE_ABSENCE_REQUEST_FAILURE":
      case "DELETE_LEAVE_ABSENCE_REQUEST_FAILURE":
      case "APPROVE_LEAVE_ABSENCE_REQUEST_FAILURE":
      case "REJECT_LEAVE_ABSENCE_REQUEST_FAILURE":
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
  