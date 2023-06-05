import {
    fetchAllDocumentsRequest, fetchDocumentsRequest, updateDocumentRequest, createDocumentRequest, deleteDocumentRequest
  } from "../api";
  
  export const fetchAllDocuments = (documentCategoryId) => {
    return async (dispatch) => {
      try {
        const response = await fetchAllDocumentsRequest(documentCategoryId);
        const { success, data } = response;
        return dispatch({ type: "FETCH_DOCUMENTS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_DOCUMENTS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const fetchDocuments = (documentCategoryId, currentPage) => {
    return async (dispatch) => {
      try {
        const response = await fetchDocumentsRequest(documentCategoryId, currentPage);
        const { success, data } = response;
        return dispatch({ type: "FETCH_DOCUMENTS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_DOCUMENTS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const createDocument = (documentCategoryId, document) => {
      return async (dispatch) => {
        try {
          const response = await createDocumentRequest(documentCategoryId, document);
          const { success, data, message } = response;
          return dispatch({ type: "CREATE_DOCUMENT_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "CREATE_DOCUMENT_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const updateDocument = (documentCategoryId, id, document) => {
      return async (dispatch) => {
        try {
          const response = await updateDocumentRequest(documentCategoryId, id, document);
          const { success, data, message } = response;
          return dispatch({ type: "UPDATE_DOCUMENT_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "UPDATE_DOCUMENT_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
    export const deleteDocument = (documentCategoryId, id) => {
      return async (dispatch) => {
        try {
          const response = await deleteDocumentRequest(documentCategoryId, id);
          const { success, message } = response;
          return dispatch({ type: "DELETE_DOCUMENT_SUCCESS", payload: { success, message } });
        } catch (error) {
          const { success, message } = error.response.data;
          return dispatch({
            type: "DELETE_DOCUMENT_FAILURE",
            payload: { success, message },
          });
        }
      };
    };