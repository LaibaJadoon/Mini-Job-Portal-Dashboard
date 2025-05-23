import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import JobFilters from "../components/JobFilters";
import JobCard from "../components/JobCard";
import { applySearchAndFiltersToBookmarks } from "../app/slices/bookmarksSlice";
import Pagination from "../components/Pagination";

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
{/* //Pagination */}
           <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
          </div>
        </div>
      </div>
    </div>
  );
}