const initialState = {
    success: false,
    data: null,
    message: null,
    errors: [],
  };

  export default function employeeReducer(state = initialState, action) {
    switch (action.type) {
      case "FETCH_EMPLOYEES_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "CREATE_EMPLOYEE_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_EMPLOYEE_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "UPDATE_EMPLOYEE_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "DELETE_EMPLOYEE_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: null,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_EMPLOYEES_FAILURE":
      case "CREATE_EMPLOYEE_FAILURE":
      case "FETCH_EMPLOYEE_FAILURE":
      case "UPDATE_EMPLOYEE_FAILURE":
      case "DELETE_EMPLOYEE_FAILURE":
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
  