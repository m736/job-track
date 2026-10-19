
import { createEntityAdapter, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobApplication } from "./jobTypes";
import { loadJobs } from "../../services/jobStorage";

export const jobsAdapter = createEntityAdapter<JobApplication>();

const initialState = jobsAdapter.getInitialState(
  {
    loading: false,
    error: null as string | null,
  },
  loadJobs(),
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<JobApplication>) => {
      jobsAdapter.addOne(state, action.payload);
    },

  updateJob: (state, action: PayloadAction<JobApplication>) => {
  if (state.entities[action.payload.id]) {
    jobsAdapter.setOne(state, action.payload);
  }
},

    deleteJob: (state, action: PayloadAction<string>) => {
      jobsAdapter.removeOne(state, action.payload);
    },
  },
});

export const { addJob, updateJob, deleteJob } = jobSlice.actions;

export default jobSlice.reducer;
