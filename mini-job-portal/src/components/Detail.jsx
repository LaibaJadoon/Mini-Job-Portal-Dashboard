import React, { useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import defaultLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "../app/slices/bookmarksSlice";

export default function Detail({ job }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    company_name,
    title,
    job_type,
    category,
    candidate_required_location,
    publication_date,
    tags,
    description,
    company_logo,
    id,
  } = job;

  const bookmarkedJobs = useSelector((state) => state.bookmarks.items);
  const isBookmarked = bookmarkedJobs.some((item) => item.id === id);

  const [applied, setApplied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleApply = () => {
    setApplied(true);
    showToast("Application Submitted!");
  };

  const handleBookmark = () => {
    dispatch(toggleBookmark(job));
    showToast(isBookmarked ? "Removed from Bookmarks" : "Added to Bookmarks");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 bg-gradient-to-br from-[#fdfdf7] to-[#f0f8f4] border border-[#064420] rounded-2xl shadow-lg relative">
      {/* Toast */}
      {toastMessage && (
        <div className="absolute top-5 right-5 bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded shadow text-sm animate-fade-in-out z-50">
          {toastMessage}
        </div>
      )}

      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-4">
          <img
            src={company_logo || defaultLogo}
            alt="Company Logo"
            onError={(e) => (e.target.src = defaultLogo)}
            className="w-16 h-16 object-cover rounded-full border border-gray-300 shadow-sm"
          />
          <div>
            <p className="text-lg font-semibold text-gray-700">{company_name}</p>
            <h1 className="text-3xl font-extrabold text-[#064420]">{title}</h1>
          </div>
        </div>

        {/* Apply Button and Bookmark */}
        <div className="flex flex-col items-end">
          <button
            onClick={handleApply}
            disabled={applied}
            className={`px-5 py-2 rounded text-sm font-semibold transition ${
              applied
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#064420] text-white hover:bg-[#053d1c]"
            }`}
          >
            {applied ? "Applied" : "Apply Now"}
          </button>
          <button
            onClick={handleBookmark}
            className="mt-3 mx-10 text-[#064420] hover:text-[#032c15]"
          >
            {isBookmarked ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
          </button>
        </div>
      </div>

      {/* Capsules */}
      <div className="mt-2 ml-16">
        <div className="flex flex-wrap gap-3 mb-3">
          <span className="px-4 py-2 bg-[#064420] text-white text-sm font-medium rounded-full shadow-sm">
            {category}
          </span>
          <span className="px-4 py-2 bg-[#064420] text-white text-sm font-medium rounded-full shadow-sm">
            {job_type}
          </span>
          <span className="px-4 py-2 bg-[#064420] text-white text-sm font-medium rounded-full shadow-sm">
            {candidate_required_location}
          </span>
          <span className="px-4 py-2 bg-[#064420] text-white text-sm font-medium rounded-full shadow-sm">
            {new Date(publication_date).toLocaleDateString()}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags?.slice(0, 6).map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 border border-[#064420] text-[#064420] text-[11px] font-bold rounded-full uppercase tracking-wide bg-white shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <hr className="border-t-2 border-[#064420] mb-8" />

      {/* Job Description */}
      <h3 className="text-2xl font-bold text-left text-[#064420] mb-6">Job Description</h3>
      <div
        className="job-description"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {/* Navigation */}
      <div className="mt-10 text-center">
        <button
          onClick={() => navigate("/jobs")}
          className="px-6 py-3 bg-[#064420] text-white font-semibold rounded hover:bg-[#043317] transition duration-200"
        >
          See More Jobs
        </button>
      </div>
    </div>
  );
}
