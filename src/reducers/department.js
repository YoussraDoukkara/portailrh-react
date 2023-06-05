const initialState = {
    success: false,
    data: null,
    message: null,
    errors: [],
  };

  export default function departmentReducer(state = initialState, action) {
    switch (action.type) {
      case "FETCH_DEPARTMENTS_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "CREATE_DEPARTMENT_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_DEPARTMENT_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "UPDATE_DEPARTMENT_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "DELETE_DEPARTMENT_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: null,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_DEPARTMENTS_FAILURE":
      case "CREATE_DEPARTMENT_FAILURE":
      case "FETCH_DEPARTMENT_FAILURE":
      case "UPDATE_DEPARTMENT_FAILURE":
      case "DELETE_DEPARTMENT_FAILURE":
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
  