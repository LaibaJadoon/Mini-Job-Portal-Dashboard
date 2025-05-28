import { createSlice } from "@reduxjs/toolkit";

const normalizeEmail = (email) => email?.trim().toLowerCase();

const getLocalStorageKey = (email) => `bookmarkedJobs_${normalizeEmail(email)}`;

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

const initialState = {
  items: [],
  filteredBookmarks: [],
  searchQuery: "",
  filters: {
    companies: [],
    categories: [],
    types: [],
    locations: [],
  },
  currentUserEmail: null,
};

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    setCurrentUserEmail: (state, action) => {
      const email = normalizeEmail(action.payload);
      state.currentUserEmail = email;
      // Load bookmarks from localStorage for this user
      state.items = loadFromLocalStorage(email);
      state.filteredBookmarks = state.items;
    },
    toggleBookmark: (state, action) => {
      const job = action.payload;
      const exists = state.items.find((item) => item.id === job.id);

      if (exists) {
        state.items = state.items.filter((item) => item.id !== job.id);
      } else {
        state.items.push(job);
      }

      saveToLocalStorage(state.currentUserEmail, state.items);
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
          job.title.toLowerCase().includes(searchQuery) ||
          job.category.toLowerCase().includes(searchQuery);

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
    resetBookmarksState: (state) => {
      // Clear all bookmarks state on logout or user switch
      state.items = [];
      state.filteredBookmarks = [];
      state.searchQuery = "";
      state.filters = {
        companies: [],
        categories: [],
        types: [],
        locations: [],
      };
      state.currentUserEmail = null;
    },
  },
});

export const {
  toggleBookmark,
  setBookmarkSearchQuery,
  setBookmarkFilters,
  clearBookmarkFilters,
  applySearchAndFiltersToBookmarks,
  setCurrentUserEmail,
  resetBookmarksState,
} = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
