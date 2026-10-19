import { describe, it, expect } from "vitest";
import { selectFilteredJobs } from "./filterSelectors";
import type { RootState } from "../../app/store";
import { jobsAdapter } from "../jobs/jobSlice";
import type { JobApplication } from "../jobs/jobTypes";

const createJob = (
  id: string,
  company: string,
  position: string,
  status: JobApplication["status"],
  appliedDate: string,
): JobApplication => ({
  id,
  company,
  position,
  location: "Bangalore",
  status,
  appliedDate,
});

const createJobsState = () =>
  jobsAdapter.setAll(
    jobsAdapter.getInitialState({
      loading: false,
      error: null as string | null,
    }),
    [
      createJob("1", "Google", "Frontend Developer", "Applied", "2026-10-10"),
      createJob("2", "Microsoft", "React Developer", "Interview", "2026-10-12"),
      createJob("3", "Amazon", "UI Developer", "Applied", "2026-10-11"),
    ],
  );

const mockState = (overrides?: {
  status?: RootState["filters"]["status"];
  search?: string;
  sortOrder?: RootState["filters"]["sortOrder"];
}): RootState => ({
  jobs: createJobsState(),
  filters: {
    status: overrides?.status ?? "All",
    search: overrides?.search ?? "",
    sortOrder: overrides?.sortOrder ?? "newest",
  },
});

describe("selectFilteredJobs", () => {
  it("should return all jobs when status is All and search is empty", () => {
    const result = selectFilteredJobs(mockState());

    expect(result).toHaveLength(3);
  });

  it("should filter jobs by status", () => {
    const result = selectFilteredJobs(mockState({ status: "Applied" }));

    expect(result).toHaveLength(2);
    expect(result.every((job) => job.status === "Applied")).toBe(true);
  });

  it("should search by company name", () => {
    const result = selectFilteredJobs(mockState({ search: "google" }));

    expect(result).toHaveLength(1);
    expect(result[0].company).toBe("Google");
  });

  it("should search by position name", () => {
    const result = selectFilteredJobs(mockState({ search: "React" }));

    expect(result).toHaveLength(1);
    expect(result[0].position).toBe("React Developer");
  });

  it("should ignore extra spaces and letter case in search", () => {
    const result = selectFilteredJobs(mockState({ search: "  GOOGLE  " }));

    expect(result).toHaveLength(1);
    expect(result[0].company).toBe("Google");
  });

  it("should sort jobs newest first", () => {
    const result = selectFilteredJobs(mockState({ sortOrder: "newest" }));

    expect(result[0].company).toBe("Microsoft");
    expect(result[2].company).toBe("Google");
  });

  it("should sort jobs oldest first", () => {
    const result = selectFilteredJobs(mockState({ sortOrder: "oldest" }));

    expect(result[0].company).toBe("Google");
    expect(result[2].company).toBe("Microsoft");
  });

  it("should combine status filter and search", () => {
    const result = selectFilteredJobs(
      mockState({ status: "Applied", search: "Amazon" }),
    );

    expect(result).toHaveLength(1);
    expect(result[0].company).toBe("Amazon");
  });
});
