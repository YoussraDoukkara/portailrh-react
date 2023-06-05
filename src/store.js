// store.js

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import userReducer from "./reducers/user";
import designationReducer from "./reducers/designation";
import departmentReducer from "./reducers/department";
import teamReducer from "./reducers/team";
import employeeReducer from "./reducers/employee";
import timeReducer from "./reducers/time";
import timesheetReducer from "./reducers/timesheet";
import reportReducer from "./reducers/report";
import attendanceReducer from "./reducers/attendance";
import leaveAbsenceRequestReducer from "./reducers/leaveAbsenceRequest";
import leaveAbsenceRequestCommentReducer from "./reducers/leaveAbsenceRequestComment";
import documentCategoryReducer from "./reducers/documentCategory";
import documentReducer from "./reducers/document";
import noteReducer from "./reducers/note";
import postReducer from "./reducers/post";
import dataReducer from "./reducers/data";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  designation: designationReducer,
  department: departmentReducer,
  team: teamReducer,
  employee: employeeReducer,
  time: timeReducer,
  timesheet: timesheetReducer,
  report: reportReducer,
  attendance: attendanceReducer,
  leaveAbsenceRequest: leaveAbsenceRequestReducer,
  leaveAbsenceRequestComment: leaveAbsenceRequestCommentReducer,
  documentCategory: documentCategoryReducer,
  document: documentReducer,
  note: noteReducer,
  post: postReducer,
  data: dataReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;