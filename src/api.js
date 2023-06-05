import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/portailrh/public/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("access_token")) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      req.headers.Authorization = "Bearer " + accessToken;
    }
  }

  return req;
});

export const loginRequest = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const logoutRequest = async () => {
  const response = await API.post("/auth/logout");
  return response.data;
};

export const sendRequest = async (email) => {
  const response = await API.post("/auth/send", {
    email,
  });
  return response.data;
};

export const resetRequest = async (token, email, password, passwordConfirmation) => {
  const response = await API.post("/auth/reset", {
    token,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
  return response.data;
};

export const fetchAllUsersRequest = async () => {
  const response = await API.get("/users");
  return response.data;
};

export const fetchUsersRequest = async (page) => {
  const response = await API.get("/users", { params: { page } });
  return response.data;
};

export const createUserRequest = async (user) => {
  const response = await API.post("/users", user);
  return response.data;
};

export const updateUserRequest = async (id, user) => {
  const response = await API.put(`users/${id}`, user);
  return response.data;
};

export const deleteUserRequest = async (id) => {
  const response = await API.delete(`users/${id}`);
  return response.data;
};

export const fetchAllDesignationsRequest = async () => {
  const response = await API.get("/designations");
  return response.data;
};

export const fetchDesignationsRequest = async (page) => {
  const response = await API.get("/designations", { params: { page } });
  return response.data;
};

export const createDesignationRequest = async (designation) => {
  const response = await API.post("/designations", designation);
  return response.data;
};

export const updateDesignationRequest = async (id, designation) => {
  const response = await API.put(`designations/${id}`, designation);
  return response.data;
};

export const deleteDesignationRequest = async (id) => {
  const response = await API.delete(`designations/${id}`);
  return response.data;
};

export const fetchAllDepartmentsRequest = async () => {
  const response = await API.get("/departments");
  return response.data;
};

export const fetchDepartmentsRequest = async (page) => {
  const response = await API.get("/departments", { params: { page } });
  return response.data;
};

export const createDepartmentRequest = async (department) => {
  const response = await API.post("/departments", department);
  return response.data;
};

export const updateDepartmentRequest = async (id, department) => {
  const response = await API.put(`departments/${id}`, department);
  return response.data;
};

export const deleteDepartmentRequest = async (id) => {
  const response = await API.delete(`departments/${id}`);
  return response.data;
};

export const fetchAllTeamsRequest = async () => {
  const response = await API.get("/teams");
  return response.data;
};

export const fetchTeamsRequest = async (page) => {
  const response = await API.get("/teams", { params: { page } });
  return response.data;
};

export const createTeamRequest = async (team) => {
  const response = await API.post("/teams", team);
  return response.data;
};

export const updateTeamRequest = async (id, team) => {
  const response = await API.put(`teams/${id}`, team);
  return response.data;
};

export const deleteTeamRequest = async (id) => {
  const response = await API.delete(`teams/${id}`);
  return response.data;
};

export const fetchAllDocumentCategoriesRequest = async () => {
  const response = await API.get("/documents/categories");
  return response.data;
};

export const fetchDocumentCategoriesRequest = async (page) => {
  const response = await API.get("/documents/categories", { params: { page } });
  return response.data;
};

export const createDocumentCategoryRequest = async (team) => {
  const response = await API.post("/documents/categories", team);
  return response.data;
};

export const updateDocumentCategoryRequest = async (id, team) => {
  const response = await API.put(`documents/categories/${id}`, team);
  return response.data;
};

export const deleteDocumentCategoryRequest = async (id) => {
  const response = await API.delete(`documents/categories/${id}`);
  return response.data;
};

export const fetchEmployeesRequest = async (page) => {
  const response = await API.get("/employees", { params: { page } });
  return response.data;
};

export const createEmployeeRequest = async (employee) => {
  const response = await API.post("/employees", employee);
  return response.data;
};

export const updateEmployeeRequest = async (id, employee) => {
  const response = await API.put(`employees/${id}`, employee);
  return response.data;
};

export const deleteEmployeeRequest = async (id) => {
  const response = await API.delete(`employees/${id}`);
  return response.data;
};

export const fetchAllTimesRequest = async () => {
  const response = await API.get("/times");
  return response.data;
};

export const fetchTimesRequest = async (page) => {
  const response = await API.get("/times", { params: { page } });
  return response.data;
};

export const createTimeRequest = async (time) => {
  const response = await API.post("/times", time);
  return response.data;
};

export const updateTimeRequest = async (id, time) => {
  const response = await API.put(`times/${id}`, time);
  return response.data;
};

export const deleteTimeRequest = async (id) => {
  const response = await API.delete(`times/${id}`);
  return response.data;
};

export const fetchAllLeaveAbsenceRequestsRequest = async () => {
  const response = await API.get("leave-absence-requests");
  return response.data;
};

export const fetchLeaveAbsenceRequestsRequest = async (page) => {
  const response = await API.get("leave-absence-requests", { params: { page } });
  return response.data;
};

export const fetchLeaveAbsenceRequestRequest = async (id) => {
  const response = await API.get(`leave-absence-requests/${id}`);
  return response.data;
};

export const createLeaveAbsenceRequestRequest = async (leaveAbsenceRequest) => {
  const response = await API.post("leave-absence-requests", leaveAbsenceRequest, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateLeaveAbsenceRequestRequest = async (id, leaveAbsenceRequest) => {
  const response = await API.put(`leave-absence-requests/${id}`, leaveAbsenceRequest);
  return response.data;
};

export const approveLeaveAbsenceRequestRequest = async (id) => {
  const response = await API.put(`leave-absence-requests/${id}/approve`);
  return response.data;
};

export const rejectLeaveAbsenceRequestRequest = async (id) => {
  const response = await API.put(`leave-absence-requests/${id}/reject`);
  return response.data;
};

export const deleteLeaveAbsenceRequestRequest = async (id) => {
  const response = await API.delete(`leave-absence-requests/${id}`);
  return response.data;
};

export const fetchAllLeaveAbsenceRequestCommentsRequest = async (leaveAbsenceRequestId) => {
  const response = await API.get(`leave-absence-requests/${leaveAbsenceRequestId}/comments`);
  return response.data;
};

export const fetchLeaveAbsenceRequestCommentsRequest = async (leaveAbsenceRequestId, page) => {
  const response = await API.get(`leave-absence-requests/${leaveAbsenceRequestId}/comments`, { params: { page } });
  return response.data;
};

export const createLeaveAbsenceRequestCommentRequest = async (leaveAbsenceRequestId, leaveAbsenceRequestComment) => {
  const response = await API.post(`leave-absence-requests/${leaveAbsenceRequestId}/comments`, leaveAbsenceRequestComment, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const fetchAllTimesheetsRequest = async (week) => {
  const response = await API.get("/timesheets", { params: { week } });
  return response.data;
};

export const createTimesheetsRequest = async (timesheets) => {
  const response = await API.post("/timesheets", timesheets);
  return response.data;
};

export const fetchAllAttendancesRequest = async (date) => {
  const response = await API.get("/attendances", { params: { date } });
  return response.data;
};

export const checkInAttendanceRequest = async () => {
  const response = await API.put(`attendances/check-in`);
  return response.data;
};

export const checkOutAttendanceRequest = async () => {
  const response = await API.put(`attendances/check-out`);
  return response.data;
};

export const breakInAttendanceRequest = async () => {
  const response = await API.put(`attendances/break-in`);
  return response.data;
};

export const breakOutAttendanceRequest = async () => {
  const response = await API.put(`attendances/break-out`);
  return response.data;
};

export const fetchAllReportsRequest = async (date, status) => {
  const response = await API.get("/reports", { params: { date, status } });
  return response.data;
};

export const fetchReportDownloadRequest = async (date) => {
  const response = await API.get("/reports/download", { params: { date } });
  return response.data;
};

export const fetchDataRequest = async () => {
  const response = await API.get("/data");
  return response.data;
};

export const fetchAllDocumentsRequest = async (documentCategoryId) => {
  const response = await API.get(`documents/categories/${documentCategoryId}/documents`);
  return response.data;
};

export const fetchDocumentsRequest = async (documentCategoryId, page) => {
  const response = await API.get(`documents/categories/${documentCategoryId}/documents`, { params: { page } });
  return response.data;
};

export const createDocumentRequest = async (documentCategoryId, document) => {
  const response = await API.post(`documents/categories/${documentCategoryId}/documents`, document, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateDocumentRequest = async (documentCategoryId, id, document) => {
  const response = await API.put(`documents/categories/${documentCategoryId}/documents/${id}`, document, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteDocumentRequest = async (documentCategoryId, id) => {
  const response = await API.delete(`documents/categories/${documentCategoryId}/documents/documents/${id}`);
  return response.data;
};

export const fetchAllNotesRequest = async () => {
  const response = await API.get("/notes");
  return response.data;
};

export const fetchNotesRequest = async (page) => {
  const response = await API.get("/notes", { params: { page } });
  return response.data;
};

export const createNoteRequest = async (team) => {
  const response = await API.post("/notes", team);
  return response.data;
};

export const fetchAllPostsRequest = async () => {
  const response = await API.get("/posts");
  return response.data;
};

export const fetchPostsRequest = async (page) => {
  const response = await API.get("/posts", { params: { page } });
  return response.data;
};

export const createPostRequest = async (team) => {
  const response = await API.post("/posts", team);
  return response.data;
};
