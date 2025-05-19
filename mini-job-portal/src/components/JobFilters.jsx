import React, { useState } from "react";

export default function JobFilters() {
  const [filters, setFilters] = useState({
    companies: [],
    categories: [],
    limits: [],
    types: [],
    locations: [],
  });

  const handleCheckboxChange = (section, value) => {
    setFilters((prev) => {
      const currentValues = prev[section];
      return {
        ...prev,
        [section]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  const handleClearAll = () => {
    setFilters({
      companies: [],
      categories: [],
      limits: [],
      types: [],
      locations: [],
    });
  };

  const renderCheckbox = (section, label) => (
    <label className="flex items-center mb-2">
      <input
        type="checkbox"
        className="w-5 h-5 mr-2"
        checked={filters[section].includes(label)}
        onChange={() => handleCheckboxChange(section, label)}
      />
      {label}
    </label>
  );

  return (
    <div className="ml-6 p-4 border border-gray-200 rounded-lg bg-[#f5f5f5] ">
      {/* Heading & Clear All */}
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

      {/* Company Filter */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Company Name</h4>
        {["Google", "Amazon", "Meta", "Upwork" ,"Others"].map((company) =>
          renderCheckbox("companies", company)
        )}
      </div>

      <hr className="my-3 border-gray-300" />

      {/* Category Filter */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Category</h4>
        {["Design", "Development", "Marketing", "Freelance" , "Others"].map((cat) =>
          renderCheckbox("categories", cat)
        )}
      </div>

      <hr className="my-3 border-gray-300" />

      {/* Limit Filter */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Limit</h4>
        {["Top 10", "Top 15", "Top 20", "Top 25" , "All"].map((limit) =>
          renderCheckbox("limits", limit)
        )}
      </div>

      <hr className="my-3 border-gray-300" />

      {/* Job Type Filter */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Job Type</h4>
        {["Full-time", "Part-time", "Contract", "Internship" ,"Others" ].map((type) =>
          renderCheckbox("types", type)
        )}
      </div>

      <hr className="my-3 border-gray-300" />

      {/* Location Filter */}
      <div>
        <h4 className="font-medium mb-2">Location</h4>
        {["Remote", "On-site", "Hybrid", "All"].map((loc) =>
          renderCheckbox("locations", loc)
        )}
      </div>
    </div>
  );
}
