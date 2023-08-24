import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/UserSlice";
import jobReducer from "./features/job/JobSlice";
import allJobsReducer from "./features/allJobs/AllJobsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
    allJobs: allJobsReducer,
  },
});
