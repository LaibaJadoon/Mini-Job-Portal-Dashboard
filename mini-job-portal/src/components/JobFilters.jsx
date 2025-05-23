import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters as setJobFilters
} from "../app/slices/jobsSlice";
import {
  setBookmarkFilters,
  clearBookmarkFilters,
  applySearchAndFiltersToBookmarks
} from "../app/slices/bookmarksSlice";

export default function JobFilters({ isBookmarksPage = false }) {
  const dispatch = useDispatch();
  const reduxFilters = useSelector((state) =>
    isBookmarksPage ? state.bookmarks.filters : state.jobs.filters
  );

  const [filters, setFiltersLocal] = useState({
    companies: [],
    categories: [],
    types: [],
    locations: [],
  });

  const handleCheckboxChange = (section, value) => {
    setFiltersLocal((prev) => {
      let newValues;

      if (value === "All") {
        newValues = ["All"];
      } else {
        newValues = prev[section].filter((v) => v !== "All");
        newValues = newValues.includes(value)
          ? newValues.filter((item) => item !== value)
          : [...newValues, value];
      }

      const updated = { ...prev, [section]: newValues };

      if (isBookmarksPage) {
        dispatch(setBookmarkFilters(updated));
        dispatch(applySearchAndFiltersToBookmarks());
      } else {
        dispatch(setJobFilters(updated));
      }

      return updated;
    });
  };

  const handleClearAll = () => {
    const cleared = {
      companies: [],
      categories: [],
      types: [],
      locations: [],
    };
    setFiltersLocal(cleared);

    if (isBookmarksPage) {
      dispatch(clearBookmarkFilters());
      dispatch(applySearchAndFiltersToBookmarks());
    } else {
      dispatch(setJobFilters(cleared));
    }
  };

  const renderCheckbox = (section, label) => (
    <label key={label} className="flex items-center mb-2">
      <input
        type="checkbox"
        className="w-5 h-5 mr-2"
        checked={filters[section].includes(label)}
        onChange={() => handleCheckboxChange(section, label)}
      />
      {label}
    </label>
  );

  useEffect(() => {
    setFiltersLocal(reduxFilters);
  }, [reduxFilters]);

  return (
    <div className="ml-6 p-4 border border-gray-200 rounded-lg bg-[#f5f5f5]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filter Jobs</h3>
        <button
          onClick={handleClearAll}
          className="text-sm text-[#064420] hover:underline"
        >
          Clear All
        </button>
      </div>

      <hr className="my-3 border-gray-300" />

      <div className="mb-4">
        <h4 className="font-medium mb-2">Company Name</h4>
        {["A.Team", "IspeedToLead", "Livestorm", "OnTheGoSystems", "Oscar Health", "All"].map((company) =>
          renderCheckbox("companies", company)
        )}
      </div>

      <hr className="my-3 border-gray-300" />

      <div className="mb-4">
        <h4 className="font-medium mb-2">Category</h4>
        {["Software Development", "Customer Service", "Design", "Marketing", "Sales / Business", "All"].map((cat) =>
          renderCheckbox("categories", cat)
        )}
      </div>

      <hr className="my-3 border-gray-300" />

      <div className="mb-4">
        <h4 className="font-medium mb-2">Job Type</h4>
        {["full_time", "part_time", "contract", "internship", "freelance", "All"].map((type) =>
          renderCheckbox("types", type)
        )}
      </div>

      <hr className="my-3 border-gray-300" />

      <div>
        <h4 className="font-medium mb-2">Location</h4>
        {["Worldwide", "UK", "Europe", "Americas", "All"].map((loc) =>
          renderCheckbox("locations", loc)
        )}
      </div>
    </div>
  );
}
