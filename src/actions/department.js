import {
    fetchAllDepartmentsRequest, fetchDepartmentsRequest, updateDepartmentRequest, createDepartmentRequest, deleteDepartmentRequest
  } from "../api";
  
  export const fetchAllDepartments = () => {
    return async (dispatch) => {
      try {
        const response = await fetchAllDepartmentsRequest();
        const { success, data } = response;
        return dispatch({ type: "FETCH_DEPARTMENTS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_DEPARTMENTS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const fetchDepartments = (currentPage) => {
    return async (dispatch) => {
      try {
        const response = await fetchDepartmentsRequest(currentPage);
        const { success, data } = response;
        return dispatch({ type: "FETCH_DEPARTMENTS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_DEPARTMENTS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const createDepartment = (department) => {
      return async (dispatch) => {
        try {
          const response = await createDepartmentRequest(department);
          const { success, data, message } = response;
          return dispatch({ type: "CREATE_DEPARTMENT_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "CREATE_DEPARTMENT_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const updateDepartment = (id, department) => {
      return async (dispatch) => {
        try {
          const response = await updateDepartmentRequest(id, department);
          const { success, data, message } = response;
          return dispatch({ type: "UPDATE_DEPARTMENT_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "UPDATE_DEPARTMENT_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const deleteDepartment = (id) => {
    return async (dispatch) => {
      try {
        const response = await deleteDepartmentRequest(id);
        const { success, message } = response;
        return dispatch({ type: "DELETE_DEPARTMENT_SUCCESS", payload: { success, message } });
      } catch (error) {
        const { success, message } = error.response.data;
        return dispatch({
          type: "DELETE_DEPARTMENT_FAILURE",
          payload: { success, message },
        });
      }
    };
  };
  