import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageKey = (email) => `appliedJobs_${email}`;

const loadFromLocalStorage = (email) => {
  try {
    if (!email) return [];
    const data = localStorage.getItem(getLocalStorageKey(email));
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (email, data) => {
  if (!email) return;
  localStorage.setItem(getLocalStorageKey(email), JSON.stringify(data));
};

const normalizeEmail = (email) => email?.trim().toLowerCase();

const initialState = {
  items: [],
  filteredAppliedJobs: [],
  searchQuery: "",
  filters: {
    companies: [],
    categories: [],
    types: [],
    locations: [],
  },
  currentUserEmail: null,
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
    setCurrentUserEmail: (state, action) => {
      const email = normalizeEmail(action.payload);
      state.currentUserEmail = email;
      state.items = loadFromLocalStorage(email);
      state.filteredAppliedJobs = state.items;
    },
    applyToJob: (state, action) => {
      const exists = state.items.find((job) => job.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveToLocalStorage(state.currentUserEmail, state.items);
      }
    },
    setAppliedJobsSearchQuery: (state, action) => {
      state.searchQuery = action.payload.toLowerCase();
    },
    setAppliedFilters: (state, action) => {
      state.filters = { ...action.payload };
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
      const searchQuery = state.searchQuery.toLowerCase();

      state.filteredAppliedJobs = state.items.filter((job) => {
        const matchesSearch =
          job.title.toLowerCase().includes(searchQuery) ||
          job.category.toLowerCase().includes(searchQuery);

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
  setCurrentUserEmail,
} = appliedJobsSlice.actions;

export default appliedJobsSlice.reducer;
