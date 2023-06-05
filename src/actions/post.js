import {
    fetchAllPostsRequest, fetchPostsRequest, createPostRequest
  } from "../api";
  
  export const fetchAllPosts = () => {
    return async (dispatch) => {
      try {
        const response = await fetchAllPostsRequest();
        const { success, data } = response;
        return dispatch({ type: "FETCH_POSTS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_POSTS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const fetchPosts = (currentPage) => {
    return async (dispatch) => {
      try {
        const response = await fetchPostsRequest(currentPage);
        const { success, data } = response;
        return dispatch({ type: "FETCH_POSTS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_POSTS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const createPost = (post) => {
      return async (dispatch) => {
        try {
          const response = await createPostRequest(post);
          const { success, data, message } = response;
          return dispatch({ type: "CREATE_POST_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "CREATE_POST_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  