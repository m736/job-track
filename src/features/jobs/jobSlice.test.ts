
import { describe, it, expect } from "vitest";
import jobReducer, {
  addJob,
  deleteJob,
  updateJob,
  jobsAdapter,
} from "./jobSlice";
import type { JobApplication } from "./jobTypes";

const createJob = (id: string, company: string): JobApplication => ({
  id,
  company,
  position: "Frontend Developer",
  location: "Bangalore",
  status: "Applied",
  appliedDate: "2026-10-14",
});

const createState = (jobs: JobApplication[] = []) =>
  jobsAdapter.setAll(
    jobsAdapter.getInitialState({
      loading: false,
      error: null as string | null,
    }),
    jobs,
  );

describe("jobSlice", () => {
  it("should add a new job", () => {
    const initialState = createState();
    const result = jobReducer(
      initialState,
      addJob(createJob("1", "Google")),
    );

    expect(result.ids).toHaveLength(1);
    expect(result.entities["1"]?.company).toBe("Google");
  });

  it("should delete a job", () => {
    const initialState = createState([createJob("1", "Google")]);
    const result = jobReducer(initialState, deleteJob("1"));

    expect(result.ids).toHaveLength(0);
    expect(result.entities["1"]).toBeUndefined();
  });

  it("should update an existing job", () => {
    const initialState = createState([createJob("1", "Google")]);
    const result = jobReducer(
      initialState,
      updateJob(createJob("1", "Microsoft")),
    );

    expect(result.ids).toHaveLength(1);
    expect(result.entities["1"]?.company).toBe("Microsoft");
  });

  it("should not update a job with an invalid ID", () => {
    const initialState = createState([createJob("1", "Google")]);
    const result = jobReducer(
      initialState,
      updateJob(createJob("99", "Microsoft")),
    );

    expect(result.ids).toHaveLength(1);
    expect(result.entities["1"]?.company).toBe("Google");
    expect(result.entities["99"]).toBeUndefined();
  });

 it("should ignore a duplicate job ID", () => {
  const initialState = createState([createJob("1", "Google")]);

  const result = jobReducer(
    initialState,
    addJob(createJob("1", "Microsoft")),
  );

  expect(result.ids).toHaveLength(1);
  expect(result.entities["1"]?.company).toBe("Google");
});

  it("should keep all jobs when deleting an invalid ID", () => {
    const initialState = createState([
      createJob("1", "Google"),
      createJob("2", "Amazon"),
    ]);
    const result = jobReducer(initialState, deleteJob("99"));

    expect(result.ids).toHaveLength(2);
    expect(result.entities["1"]?.company).toBe("Google");
    expect(result.entities["2"]?.company).toBe("Amazon");
  });

  it("should update a job status", () => {
    const initialState = createState([createJob("1", "Google")]);
    const result = jobReducer(
      initialState,
      updateJob({
        ...createJob("1", "Google"),
        status: "Interview",
      }),
    );

    expect(result.entities["1"]?.status).toBe("Interview");
    expect(result.ids).toHaveLength(1);
  });
});
