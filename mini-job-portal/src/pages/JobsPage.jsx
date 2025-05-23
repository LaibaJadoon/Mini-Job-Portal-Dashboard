import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../app/slices/jobsSlice";
import SearchBar from "../components/SearchBar";
import JobFilters from "../components/JobFilters";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";


export default function JobsPage() {
  const dispatch = useDispatch();
  const { filteredJobs, status, error } = useSelector((state) => state.jobs);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 15;

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Reset page to 1 whenever the filtered jobs change (for proper pagination)
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredJobs]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="bg-white min-h-screen text-[#064420]">
      <div className="mt-16 px-6 md:px-16 py-6">
        <SearchBar />

        <div className="flex flex-col md:flex-row gap-6 mt-12">
          <div className="w-full md:w-1/4">
            <JobFilters />
          </div>

          <div className="w-full md:w-3/4">
            {status === "loading" && <p>Loading jobs...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" && (
              <>
                {/* Dynamic results message */}
                <p className="mb-4 font-semibold text-[#064420]">
                  {filteredJobs.length === 0
                    ? "No results found"
                    : `${filteredJobs.length} job${filteredJobs.length > 1 ? "s" : ""} found`}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {/* Pagination */}
               <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
