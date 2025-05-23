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
      companies: [],
      categories: [],
      types: [],
      locations: [],
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
      state.filters = { ...action.payload };
    },

    clearBookmarkFilters: (state) => {
      state.filters = {
        companies: [],
        categories: [],
        types: [],
        locations: [],
      };
    },

    applySearchAndFiltersToBookmarks: (state) => {
      const { items, searchQuery, filters } = state;

      const filtered = items.filter((job) => {
        const matchesSearch =
  job.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
  job.category.toLowerCase().includes(state.searchQuery.toLowerCase());

        const matchesCompanies =
          filters.companies.length === 0 ||
          filters.companies.includes("All") ||
          filters.companies.includes(job.company_name);

        const matchesCategories =
          filters.categories.length === 0 ||
          filters.categories.includes("All") ||
          filters.categories.includes(job.category);

        const matchesTypes =
          filters.types.length === 0 ||
          filters.types.includes("All") ||
          filters.types.includes(job.job_type.toLowerCase());

        const matchesLocations =
          filters.locations.length === 0 ||
          filters.locations.includes("All") ||
          filters.locations.some((loc) =>
            job.candidate_required_location
              .toLowerCase()
              .includes(loc.toLowerCase())
          );

        return (
          matchesSearch &&
          matchesCompanies &&
          matchesCategories &&
          matchesTypes &&
          matchesLocations
        );
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
