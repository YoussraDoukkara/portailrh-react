import {
    fetchEmployeesRequest, updateEmployeeRequest, createEmployeeRequest, deleteEmployeeRequest
  } from "../api";
  
  export const fetchEmployees = (currentPage) => {
    return async (dispatch) => {
      try {
        const response = await fetchEmployeesRequest(currentPage);
        const { success, data } = response;
        return dispatch({ type: "FETCH_EMPLOYEES_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_EMPLOYEES_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const createEmployee = (employee) => {
      return async (dispatch) => {
        try {
          const response = await createEmployeeRequest(employee);
          const { success, data, message } = response;
          return dispatch({ type: "CREATE_EMPLOYEE_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "CREATE_EMPLOYEE_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const updateEmployee = (id, employee) => {
      return async (dispatch) => {
        try {
          const response = await updateEmployeeRequest(id, employee);
          const { success, data, message } = response;
          return dispatch({ type: "UPDATE_EMPLOYEE_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "UPDATE_EMPLOYEE_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const deleteEmployee = (id) => {
    return async (dispatch) => {
      try {
        const response = await deleteEmployeeRequest(id);
        const { success, message } = response;
        return dispatch({ type: "DELETE_EMPLOYEE_SUCCESS", payload: { success, message } });
      } catch (error) {
        const { success, message } = error.response.data;
        return dispatch({
          type: "DELETE_EMPLOYEE_FAILURE",
          payload: { success, message },
        });
      }
    };
  };
  