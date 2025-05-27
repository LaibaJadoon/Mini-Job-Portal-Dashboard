import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("appliedJobs");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (data) => {
  localStorage.setItem("appliedJobs", JSON.stringify(data));
};

const initialState = {
  items: loadFromLocalStorage(),
  filteredAppliedJobs: loadFromLocalStorage(),
  searchQuery: "",
  filters: {
    companies: [],
    categories: [],
    types: [],
    locations: [],
  },
};

const matchesFilters = (job, filters) => {
  const match = (field, selected) =>
    selected.length === 0 || selected.includes("All") || selected.includes(job[field]);

  return (
    match("company_name", filters.companies) &&
    match("category", filters.categories) &&
    match("job_type", filters.types) &&
    match("candidate_required_location", filters.locations)
  );
};

const appliedJobsSlice = createSlice({
  name: "appliedJobs",
  initialState,
  reducers: {
    applyToJob: (state, action) => {
      const exists = state.items.find((job) => job.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveToLocalStorage(state.items);
      }
    },
    setAppliedJobsSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setAppliedFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearAppliedFilters: (state) => {
      state.filters = {
        companies: [],
        categories: [],
        types: [],
        locations: [],
      };
    },
    applySearchAndFiltersToAppliedJobs: (state) => {
      state.filteredAppliedJobs = state.items.filter((job) => {
        const matchesSearch =
  job.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
  job.category.toLowerCase().includes(state.searchQuery.toLowerCase());

        const matches = matchesFilters(job, state.filters);

        return matchesSearch && matches;
      });
    },
  },
});

export const {
  applyToJob,
  setAppliedJobsSearchQuery, 
  setAppliedFilters,
  clearAppliedFilters,
  applySearchAndFiltersToAppliedJobs,
} = appliedJobsSlice.actions;

export default appliedJobsSlice.reducer;
