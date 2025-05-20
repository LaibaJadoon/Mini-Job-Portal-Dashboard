import React, { useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import companyLogo from "../assets/logo.png";

export default function JobCard({ job }) {
  const { company_name, company_logo, title, job_type, description } = job;

  const [bookmarked, setBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    showToast(bookmarked ? "Removed from Bookmarks" : "Added to Bookmarks");
  };

  const handleApply = () => {
    setApplied(true);
    showToast("Application Submitted!");
  };

  const handleViewDetails = () => {
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
          {bookmarked ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
        </div>
      </div>

      <h2 className="text-lg font-bold mb-1">{title}</h2>

      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
        {description.replace(/<[^>]+>/g, "").slice(0, 150)}...
      </p>

      {/* Sticky Bottom Buttons */}
      <div className="flex gap-4 mt-auto pt-4">
        <button
          onClick={handleApply}
          className={`px-4 py-2 rounded ${
            applied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#064420] text-white"
          }`}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply Now"}
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
