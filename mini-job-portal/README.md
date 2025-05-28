# Job Portal React App

A modern remote jobs portal built with React, Redux Toolkit, and Tailwind CSS. This app fetches remote jobs from the Remotive API and allows users to search, filter, bookmark, and apply to jobs. It supports multiple pages like Jobs, Bookmarks, and Applied Jobs, all with integrated search, filters, and pagination.

## Features

- **User Authentication:** Simple login/logout flow with user info in Redux.

- **Job Listings:** Fetches remote jobs dynamically from Remotive API.

- **Search & Filters:** Live search and multi-category filters (company, category, job type, location).

- **Bookmarks:** Save favorite jobs with persistent localStorage sync.

- **Applied Jobs:** Apply to jobs and track applied positions with status and persistence.

- **Job Details:** View detailed job descriptions with apply and bookmark buttons.

- **Pagination:** Client-side pagination with First, Prev, Next, and Last controls.

- **Responsive Design:** Fully responsive UI built with Tailwind CSS.

- **Profile Dropdown:** User menu with navigation links and logout.

- **Redux Toolkit:** Centralized state management for jobs, bookmarks, applied jobs, and auth.

- **LocalStorage Persistence:** Bookmark and applied jobs saved to localStorage.

- **Search & Filter Redux Logic:** Search and filters trigger Redux actions to update views.

- **Dropdown Close on Outside Click:** UX improvement for profile dropdown.

## Tech Stack

- React (with hooks)

- Redux Toolkit (slice, async thunks)

- React Router DOM

- Tailwind CSS

- Axios (for API calls)

- React Icons (for icons like user profile)

- LocalStorage for persistence

## Usage

- **Jobs Page:** Browse all jobs with search and filter options.

- **Bookmarks Page:** View jobs you have bookmarked, with search/filter/pagination.

- **Applied Jobs Page:** View jobs you applied to, also with search/filter/pagination.

- **Job Details:** Click a job card to view detailed info, apply or bookmark.

- **Profile Menu:** Access Bookmarks, Applied Jobs, or Logout from the user menu in header.

