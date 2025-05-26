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

import {
  setAppliedFilters,
  clearAppliedFilters,
  applySearchAndFiltersToAppliedJobs
} from "../app/slices/appliedJobsSlice";

export default function JobFilters({ isBookmarksPage = false, isAppliedJobsPage = false }) {
  const dispatch = useDispatch();
  const reduxFilters = useSelector((state) =>
    isBookmarksPage ? state.bookmarks.filters : isAppliedJobsPage ? state.appliedJobs.filters : state.jobs.filters
  );

  const [filters, setFiltersLocal] = useState({
    companies: [],
    categories: [],
    types: [],
    locations: [],
  });

  const [openSections, setOpenSections] = useState({
    companies: false,
    categories: false,
    types: false,
    locations: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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
      } else if (isAppliedJobsPage) {
        dispatch(setAppliedFilters(updated));
        dispatch(applySearchAndFiltersToAppliedJobs());
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
    } else if (isAppliedJobsPage) {
      dispatch(clearAppliedFilters());
      dispatch(applySearchAndFiltersToAppliedJobs());
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

  const AccordionSection = ({ title, sectionKey, options }) => (
    <div className="md:hidden">
      <button
        className="w-full text-left font-medium text-[#064420] py-2 border-b border-gray-300"
        onClick={() => toggleSection(sectionKey)}
      >
        {title}
      </button>
      {openSections[sectionKey] && (
        <div className="py-2 pl-2">
          {options.map((opt) => renderCheckbox(sectionKey, opt))}
        </div>
      )}
    </div>
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

      {/* Mobile View (Accordion) */}
      <div className="md:hidden">
        <AccordionSection
          title="Company Name"
          sectionKey="companies"
          options={["A.Team", "Array", "Livestorm", "Toast", "Limble", "All"]}
        />
        <AccordionSection
          title="Category"
          sectionKey="categories"
          options={["Software Development", "Customer Service", "Design", "Marketing", "Sales / Business", "All"]}
        />
        <AccordionSection
          title="Job Type"
          sectionKey="types"
          options={["full_time", "part_time", "contract", "internship", "freelance", "All"]}
        />
        <AccordionSection
          title="Location"
          sectionKey="locations"
          options={["Worldwide", "UK", "Europe", "Americas", "All"]}
        />
      </div>

      {/* Desktop View (Original layout) */}
      <div className="hidden md:block">
        <div className="mb-4">
          <h4 className="font-medium mb-2">Company Name</h4>
          {["A.Team", "Array", "Livestorm", "Toast", "Limble", "All"].map((company) =>
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
    </div>
  );
}
