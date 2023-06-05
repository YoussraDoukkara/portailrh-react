const initialState = {
  success: false,
  data: null,
  message: null,
  errors: []
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SEND_SUCCESS':
    case 'RESET_SUCCESS':
      return {
        ...state,
        success: action.payload.success,
        data: action.payload.data,
        message: action.payload.message,
        errors: []
      };
    case 'LOGIN_FAILURE':
    case 'SEND_FAILURE':
    case 'RESET_FAILURE':
      return {
        ...state,
        success: action.payload.success,
        data: null,
        message: action.payload.message,
        errors: action.payload.errors
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        success: action.payload.success,
        data: null,
        message: action.payload.message,
        errors: []
      };
    case 'LOGOUT_FAILURE':
      return {
        ...state,
        success: action.payload.success,
        accessToken: null,
        data: null,
        message: action.payload.message,
        errors: action.payload.errors
      };
    default:
      return state;
  }
}
