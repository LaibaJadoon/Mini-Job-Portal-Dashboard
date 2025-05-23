import React, { useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import companyLogo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedJob } from "../app/slices/jobsSlice";
import { toggleBookmark } from "../app/slices/bookmarksSlice";
import { applyToJob } from "../app/slices/appliedJobsSlice";

export default function JobCard({ job }) {
  const { company_name, company_logo, title, job_type, description } = job;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bookmarkedJobs = useSelector((state) => state.bookmarks.items);
  const isBookmarked = bookmarkedJobs.some((item) => item.id === job.id);

  const appliedJobs = useSelector((state) => state.appliedJobs.items);
  const isApplied = appliedJobs.some((item) => item.id === job.id);

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleBookmark = () => {
    dispatch(toggleBookmark(job));
    showToast(isBookmarked ? "Removed from Bookmarks" : "Added to Bookmarks");
  };

  const handleApply = () => {
    if (!isApplied) {
      dispatch(applyToJob(job));
      showToast("Application Submitted!");
    }
  };

  const handleViewDetails = () => {
    dispatch(setSelectedJob(job));
    navigate("/job-details");
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition duration-300 relative flex flex-col h-full">
      {toastMessage && (
        <div className="absolute top-10 right-2 bg-green-100 border border-green-400 text-green-800 px-3 py-1 rounded shadow text-sm animate-fade-in-out">
          {toastMessage}
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <img
            src={company_logo || companyLogo}
            alt={`${company_name} logo`}
            className="w-10 h-10 object-contain rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = companyLogo;
            }}
          />
          <div>
            <p className="font-semibold text-sm">{company_name}</p>
            <p className="text-xs text-gray-500">
              {job.category}
              {job_type && `   • ${job_type}`}
            </p>
          </div>
        </div>
        <div className="cursor-pointer text-[#064420]" onClick={handleBookmark}>
          {isBookmarked ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
        </div>
      </div>

      <h2 className="text-lg font-bold mb-1">{title}</h2>

      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
        {description.replace(/<[^>]+>/g, "").slice(0, 150)}...
      </p>

      {/* Bottom Buttons */}
      <div className="flex gap-4 mt-auto pt-4">
        <button
          onClick={handleApply}
          className={`px-4 py-2 rounded ${
            isApplied ? "bg-gray-400 cursor-not-allowed" : "bg-[#064420] text-white"
          }`}
          disabled={isApplied}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>

        <button
          onClick={handleViewDetails}
          className="px-4 py-2 border border-[#064420] text-[#064420] rounded"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
