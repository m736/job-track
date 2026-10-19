
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { selectJobs } from "../jobs/jobSelectors";

export const selectStatusFilter = (state: RootState) =>
  state.filters.status;

export const selectSearch = (state: RootState) =>
  state.filters.search;

export const selectSortOrder = (state: RootState) =>
  state.filters.sortOrder;

export const selectFilteredJobs = createSelector(
  [selectJobs, selectStatusFilter, selectSearch, selectSortOrder],
  (jobs, status, search, sortOrder) => {
    const normalizedSearch = search.trim().toLowerCase();

    const filteredJobs = jobs.filter((job) => {
      const matchesStatus =
        status === "All" || job.status === status;

      const matchesSearch =
        job.company.toLowerCase().includes(normalizedSearch) ||
        job.position.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });

    return [...filteredJobs].sort((a, b) => {
      const dateA = new Date(a.appliedDate).getTime();
      const dateB = new Date(b.appliedDate).getTime();

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });
  },
);
