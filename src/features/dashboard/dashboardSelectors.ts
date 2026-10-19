
import { createSelector } from "@reduxjs/toolkit";
import { selectJobs, selectJobCount } from "../jobs/jobSelectors";
import type { RootState } from "../../app/store";

export const selectTotalApplications = (state: RootState) =>
  selectJobCount(state);

export const selectInterviewCount = createSelector(
  [selectJobs],
  (jobs) => jobs.filter((job) => job.status === "Interview").length,
);

export const selectOfferCount = createSelector(
  [selectJobs],
  (jobs) => jobs.filter((job) => job.status === "Offer").length,
);

export const selectRejectedCount = createSelector(
  [selectJobs],
  (jobs) => jobs.filter((job) => job.status === "Rejected").length,
);
