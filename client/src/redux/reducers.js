import { combineReducers } from "@reduxjs/toolkit";
import scheduleReducer from "./scheduleSlice";
import fileManagementSlice from "./fileManagementSlice";

const rootReducer = combineReducers({
  schedules: scheduleReducer,
  fileManagement: fileManagementSlice,
});

export default rootReducer;
