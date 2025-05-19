import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import JobFilters from "../components/JobFilters";
import JobCard from "../components/JobCard";

export default function JobsPage() {
  const [currentPage, setCurrentPage] = useState(1);


  const allJobs = Array.from({ length: 40 }); // Simulate 40 jobs for demo
  const jobsPerPage = 15;
  const totalPages = Math.ceil(allJobs.length / jobsPerPage);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="bg-white min-h-screen text-[#064420]">
      <div className="mt-16 px-6 md:px-16 py-6">
        <SearchBar />

        <div className="flex flex-col md:flex-row gap-6 mt-12">
          {/* Left Sidebar - Filters */}
          <div className="w-full md:w-1/4">
            <JobFilters />
          </div>

          {/* Right - Job Cards */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentJobs.map((_, index) => (
                <JobCard key={index} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center gap-2">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-[#064420] text-white rounded-md disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-[#064420] text-white"
                      : "bg-gray-200 text-[#064420]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                className="px-4 py-2 bg-[#064420] text-white rounded-md disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
