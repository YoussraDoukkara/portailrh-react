const initialState = {
    success: false,
    data: null,
    message: null,
    errors: [],
  };

  export default function documentCategoryReducer(state = initialState, action) {
    switch (action.type) {
      case "FETCH_DOCUMENT_CATEGORIES_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "CREATE_DOCUMENT_CATEGORY_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_DOCUMENT_CATEGORY_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: null,
          errors: [],
        };
  
      case "UPDATE_DOCUMENT_CATEGORY_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: action.payload.data,
          message: action.payload.message,
          errors: [],
        };
  
      case "DELETE_DOCUMENT_CATEGORY_SUCCESS":
        return {
          ...state,
          success: action.payload.success,
          data: null,
          message: action.payload.message,
          errors: [],
        };
  
      case "FETCH_DOCUMENT_CATEGORIES_FAILURE":
      case "CREATE_DOCUMENT_CATEGORY_FAILURE":
      case "FETCH_DOCUMENT_CATEGORY_FAILURE":
      case "UPDATE_DOCUMENT_CATEGORY_FAILURE":
      case "DELETE_DOCUMENT_CATEGORY_FAILURE":
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
  