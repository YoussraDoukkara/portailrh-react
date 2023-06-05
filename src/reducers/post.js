const initialState = {
    success: false,
    data: null,
    message: null,
    errors: [],
  };

  export default function postReducer(state = initialState, action) {
    switch (action.type) {
      case "FETCH_POSTS_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "CREATE_POST_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_POST_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "UPDATE_POST_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "DELETE_POST_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: null,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_POSTS_FAILURE":
      case "CREATE_POST_FAILURE":
      case "FETCH_POST_FAILURE":
      case "UPDATE_POST_FAILURE":
      case "DELETE_POST_FAILURE":
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
  