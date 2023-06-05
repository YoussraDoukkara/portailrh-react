import {
    fetchAllTeamsRequest, fetchTeamsRequest, updateTeamRequest, createTeamRequest, deleteTeamRequest
  } from "../api";
  
  export const fetchAllTeams = () => {
    return async (dispatch) => {
      try {
        const response = await fetchAllTeamsRequest();
        const { success, data } = response;
        return dispatch({ type: "FETCH_TEAMS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_TEAMS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const fetchTeams = (currentPage) => {
    return async (dispatch) => {
      try {
        const response = await fetchTeamsRequest(currentPage);
        const { success, data } = response;
        return dispatch({ type: "FETCH_TEAMS_SUCCESS", payload: { success, data } });
      } catch (error) {
        const { success, message, errors } = error.response.data;
        return dispatch({
          type: "FETCH_TEAMS_FAILURE",
          payload: { success, message, errors },
        });
      }
    };
  };
  
  export const createTeam = (team) => {
      return async (dispatch) => {
        try {
          const response = await createTeamRequest(team);
          const { success, data, message } = response;
          return dispatch({ type: "CREATE_TEAM_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "CREATE_TEAM_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const updateTeam = (id, team) => {
      return async (dispatch) => {
        try {
          const response = await updateTeamRequest(id, team);
          const { success, data, message } = response;
          return dispatch({ type: "UPDATE_TEAM_SUCCESS", payload: { success, data, message } });
        } catch (error) {
          const { success, message, errors } = error.response.data;
          return dispatch({
            type: "UPDATE_TEAM_FAILURE",
            payload: { success, message, errors },
          });
        }
      };
    };
  
  export const deleteTeam = (id) => {
    return async (dispatch) => {
      try {
        const response = await deleteTeamRequest(id);
        const { success, message } = response;
        return dispatch({ type: "DELETE_TEAM_SUCCESS", payload: { success, message } });
      } catch (error) {
        const { success, message } = error.response.data;
        return dispatch({
          type: "DELETE_TEAM_FAILURE",
          payload: { success, message },
        });
      }
    };
  };
  