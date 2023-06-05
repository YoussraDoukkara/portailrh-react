const initialState = {
    success: false,
    data: null,
    message: null,
    errors: [],
  };

  export default function timesheetReducer(state = initialState, action) {
    switch (action.type) {
      case "FETCH_TIMESHEETS_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
        case "CREATE_TIMESHEETS_SUCCESS":
          return {
            ...state,
            success: action.payload.success,
            data: action.payload.data,
            message: action.payload.message,
            errors: [],
          };
  
      case "FETCH_TIMESHEETS_FAILURE":
        case "CREATE_TIMESHEETS_FAILURE":
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
  