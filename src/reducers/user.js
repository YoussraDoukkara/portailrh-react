const initialState = {
  success: false,
  data: null,
  message: null,
  errors: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        success: action.payload.success,
        data: action.payload.data,
        message: null,
        errors: [],
      };

    case "CREATE_USER_SUCCESS":
      return {
        ...state,
        success: action.payload.success,
        data: action.payload.data,
        message: action.payload.message,
        errors: [],
      };

    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        success: action.payload.success,
        data: action.payload.data,
        message: null,
        errors: [],
      };

    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        success: action.payload.success,
        data: action.payload.data,
        message: action.payload.message,
        errors: [],
      };

    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        success: action.payload.success,
        data: null,
        message: action.payload.message,
        errors: [],
      };

    case "FETCH_USERS_FAILURE":
    case "CREATE_USER_FAILURE":
    case "FETCH_USER_FAILURE":
    case "UPDATE_USER_FAILURE":
    case "DELETE_USER_FAILURE":
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
