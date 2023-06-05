const initialState = {
    success: false,
    data: null,
    message: null,
    errors: [],
  };

  export default function attendanceReducer(state = initialState, action) {
    switch (action.type) {
      case "FETCH_ATTENDANCES_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "FETCH_ATTENDANCES_FAILURE":
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
  