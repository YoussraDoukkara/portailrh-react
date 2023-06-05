import {
    fetchAllDocumentCategoriesRequest, fetchDocumentCategoriesRequest, updateDocumentCategoryRequest, createDocumentCategoryRequest, deleteDocumentCategoryRequest
  } from "../api";
  
  export const fetchAllDocumentCategories = () => {
    return async (dispatch) => {
      try {
        const response = await fetchAllDocumentCategoriesRequest();
        const { success, data } = response;
        return dispatch({ type: "FETCH_DOCUMENT_CATEGORIES_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_DOCUMENT_CATEGORIES_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const fetchDocumentCategories = (currentPage) => {
    return async (dispatch) => {
      try {
        const response = await fetchDocumentCategoriesRequest(currentPage);
        const { success, data } = response;
        return dispatch({ type: "FETCH_DOCUMENT_CATEGORIES_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_DOCUMENT_CATEGORIES_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const createDocumentCategory = (documentCategory) => {
      return async (dispatch) => {
        try {
          const response = await createDocumentCategoryRequest(documentCategory);
          const { success, data, message } = response;
          return dispatch({ type: "CREATE_DOCUMENT_CATEGORY_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "CREATE_DOCUMENT_CATEGORY_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const updateDocumentCategory = (id, documentCategory) => {
      return async (dispatch) => {
        try {
          const response = await updateDocumentCategoryRequest(id, documentCategory);
          const { success, data, message } = response;
          return dispatch({ type: "UPDATE_DOCUMENT_CATEGORY_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "UPDATE_DOCUMENT_CATEGORY_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
    export const deleteDocumentCategory = (id) => {
      return async (dispatch) => {
        try {
          const response = await deleteDocumentCategoryRequest(id);
          const { success, message } = response;
          return dispatch({ type: "DELETE_DOCUMENT_CATEGORY_SUCCESS", payload: { success, message } });
        } catch (error) {
          const { success, message } = error.response.data;
          return dispatch({
            type: "DELETE_DOCUMENT_CATEGORY_FAILURE",
            payload: { success, message },
          });
        }
      };
    };