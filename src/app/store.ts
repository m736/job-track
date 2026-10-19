
import { configureStore } from "@reduxjs/toolkit";
import jobReducer, { jobsAdapter } from "../features/jobs/jobSlice";
import filterReducer from "../features/filters/filterSlice";
import { saveJobs } from "../services/jobStorage";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const selectAllJobs = jobsAdapter.getSelectors().selectAll;

let previousJobs = selectAllJobs(store.getState().jobs);

store.subscribe(() => {
  const currentJobs = selectAllJobs(store.getState().jobs);

  if (currentJobs !== previousJobs) {
    previousJobs = currentJobs;
    saveJobs(currentJobs);
  }
});
