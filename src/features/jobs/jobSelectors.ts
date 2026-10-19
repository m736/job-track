
import type { RootState } from "../../app/store";
import { jobsAdapter } from "./jobSlice";

export const {
  selectAll: selectJobs,
  selectById: selectJobById,
  selectTotal: selectJobCount,
} = jobsAdapter.getSelectors<RootState>(
  (state) => state.jobs,
);
