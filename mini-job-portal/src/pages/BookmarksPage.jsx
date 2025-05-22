import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import JobFilters from "../components/JobFilters";
import JobCard from "../components/JobCard";
import { applySearchAndFiltersToBookmarks } from "../app/slices/bookmarksSlice";

export default function BookmarksPage() {
  const dispatch = useDispatch();
  const { items: bookmarkedJobs, filteredBookmarks } = useSelector((state) => state.bookmarks);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 15;

  useEffect(() => {
    dispatch(applySearchAndFiltersToBookmarks());
  }, [bookmarkedJobs, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredBookmarks]);

  const totalPages = Math.ceil(filteredBookmarks.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredBookmarks.slice(indexOfFirstJob, indexOfLastJob);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="bg-white min-h-screen text-[#064420]">
      <div className="mt-16 px-6 md:px-16 py-6">
        <SearchBar isBookmarksPage />
        <div className="flex flex-col md:flex-row gap-6 mt-12">
          <div className="w-full md:w-1/4">
            <JobFilters isBookmarksPage />
          </div>

          <div className="w-full md:w-3/4">
            <p className="mb-4 font-semibold text-[#064420]">
              {filteredBookmarks.length === 0
                ? "No results found"
                : `${filteredBookmarks.length} job${filteredBookmarks.length > 1 ? "s" : ""} found`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            <div className="mt-8 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-[#064420] text-white rounded disabled:opacity-50"
              >
                First
              </button>
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-[#064420] text-white rounded disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: 3 }, (_, i) => {
                const page = currentPage - 1 + i;
                if (page < 1 || page > totalPages) return null;
                const isCurrent = currentPage === page;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded border ${
                      isCurrent
                        ? "bg-[#064420] text-white border-[#064420]"
                        : "border-[#064420] text-[#064420] bg-white"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-[#064420] text-white rounded disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-[#064420] text-white rounded disabled:opacity-50"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}