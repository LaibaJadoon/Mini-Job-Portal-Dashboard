import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch jobs
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await axios.get("https://remotive.com/api/remote-jobs");
  return response.data.jobs;
});
let savedSelectedJob = null;
try {
  const jobFromStorage = localStorage.getItem("selectedJob");
  if (jobFromStorage) {
    savedSelectedJob = JSON.parse(jobFromStorage);
  }
} catch (error) {
  console.error("Error parsing selectedJob from localStorage:", error);
}

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    filteredJobs: [],
    searchTerm: "",
    status: "idle",
    error: null,
     selectedJob: savedSelectedJob,
    filters: {
      companies: [],
      categories: [],
      types: [],
      locations: [],
    },
   
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      applyCombinedFilters(state);
    },

    setFilters: (state, action) => {
      state.filters = action.payload;
      applyCombinedFilters(state);
    },

    setSelectedJob: (state, action) => {
  state.selectedJob = action.payload;
  localStorage.setItem("selectedJob", JSON.stringify(action.payload)); // persist it
},

  clearSelectedJob: (state) => {
    state.selectedJob = null; 
  },
},

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
        state.filteredJobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

//  Helper to apply both search and filters together
const applyCombinedFilters = (state) => {
  const term = state.searchTerm.toLowerCase().trim();
  const { companies, categories, types, locations } = state.filters;

  state.filteredJobs = state.jobs.filter((job) => {
    const searchMatch =
      term === "" ||
      job.title.toLowerCase().includes(term) ||
      job.category?.toLowerCase().includes(term);

    const companyMatch =
      companies.length === 0 ||
      companies.includes("All") ||
      companies.includes(job.company_name);

    const categoryMatch =
      categories.length === 0 ||
      categories.includes("All") ||
      categories.includes(job.category);

    const typeMatch =
      types.length === 0 ||
      types.includes("All") ||
      types.includes(job.job_type);

    const locationMatch =
      locations.length === 0 ||
      locations.includes("All") ||
      locations.includes(job.candidate_required_location);

    return searchMatch && companyMatch && categoryMatch && typeMatch && locationMatch;
  });
};

export const { setSearchTerm, setFilters, setSelectedJob, clearSelectedJob } = jobsSlice.actions;

export default jobsSlice.reducer;

