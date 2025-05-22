import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const savedBookmarks = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    items: savedBookmarks,
    filteredBookmarks: savedBookmarks,
    searchQuery: "",
    filters: {
      location: "",
      jobType: "",
      category: "",
    },
  },
  reducers: {
    toggleBookmark: (state, action) => {
      const job = action.payload;
      const exists = state.items.find((item) => item.id === job.id);

      if (exists) {
        state.items = state.items.filter((item) => item.id !== job.id);
      } else {
        state.items.push(job);
      }

      // Update localStorage
      localStorage.setItem("bookmarkedJobs", JSON.stringify(state.items));
    },

    setBookmarkSearchQuery: (state, action) => {
      state.searchQuery = action.payload.toLowerCase();
    },

    setBookmarkFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearBookmarkFilters: (state) => {
      state.filters = {
        location: "",
        jobType: "",
        category: "",
      };
    },

    applySearchAndFiltersToBookmarks: (state) => {
      const { items, searchQuery, filters } = state;

      const filtered = items.filter((job) => {
        const matchesSearch =
          job.title.toLowerCase().includes(searchQuery) ||
          job.description.toLowerCase().includes(searchQuery);

        const matchesLocation =
          !filters.location || job.candidate_required_location.toLowerCase().includes(filters.location.toLowerCase());

        const matchesJobType =
          !filters.jobType || job.job_type.toLowerCase() === filters.jobType.toLowerCase();

        const matchesCategory =
          !filters.category || job.category.toLowerCase() === filters.category.toLowerCase();

        return matchesSearch && matchesLocation && matchesJobType && matchesCategory;
      });

      state.filteredBookmarks = filtered;
    },
  },
});

export const {
  toggleBookmark,
  setBookmarkSearchQuery,
  setBookmarkFilters,
  clearBookmarkFilters,
  applySearchAndFiltersToBookmarks,
} = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
