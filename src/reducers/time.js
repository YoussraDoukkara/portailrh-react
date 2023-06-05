const initialState = {
    success: false,
    data: null,
    message: null,
    errors: [],
  };

  export default function timeReducer(state = initialState, action) {
    switch (action.type) {
      case "FETCH_TIMES_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "CREATE_TIME_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_TIME_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "UPDATE_TIME_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "DELETE_TIME_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: null,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_TIMES_FAILURE":
      case "CREATE_TIME_FAILURE":
      case "FETCH_TIME_FAILURE":
      case "UPDATE_TIME_FAILURE":
      case "DELETE_TIME_FAILURE":
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
  