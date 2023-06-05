import {
    fetchAllNotesRequest, fetchNotesRequest, createNoteRequest
  } from "../api";
  
  export const fetchAllNotes = () => {
    return async (dispatch) => {
      try {
        const response = await fetchAllNotesRequest();
        const { success, data } = response;
        return dispatch({ type: "FETCH_NOTES_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_NOTES_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const fetchNotes = (currentPage) => {
    return async (dispatch) => {
      try {
        const response = await fetchNotesRequest(currentPage);
        const { success, data } = response;
        return dispatch({ type: "FETCH_NOTES_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_NOTES_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const createNote = (note) => {
      return async (dispatch) => {
        try {
          const response = await createNoteRequest(note);
          const { success, data, message } = response;
          return dispatch({ type: "CREATE_NOTE_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "CREATE_NOTE_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  