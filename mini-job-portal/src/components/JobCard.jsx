import React, { useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import companyLogo from "../assets/logo.png"; // Use your actual logo asset

export default function JobCard() {
  const [bookmarked, setBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    showToast(bookmarked ? "Removed from Bookmarks" : "Added to Bookmarks");
  };

 const [applied, setApplied] = useState(false);

const handleApply = () => {
  setApplied(true);
  showToast("Application Submitted!");
};

  const handleViewDetails = () => {
    navigate("/job-details"); // Make sure this route exists
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition duration-300 relative">
      {/* Toast message */}
      {toastMessage && (
        <div className="absolute top-10 right-2 bg-green-100 border border-green-400 text-green-800 px-3 py-1 rounded shadow text-sm animate-fade-in-out">
          {toastMessage}
        </div>
      )}

      {/* Top: Company Logo, Name, Bookmark */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <img
            src={companyLogo}
            alt="Company Logo"
            className="h-12 w-12 object-contain"
          />
          <div>
            <p className="font-semibold text-sm">Tech Solutions Inc.</p>
            <p className="text-xs text-gray-500">Innovating the Future</p>
          </div>
        </div>
        <div
          className="cursor-pointer text-[#064420]"
          onClick={handleBookmark}
        >
          {bookmarked ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold mb-1">Frontend Developer</h2>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
        We are looking for a passionate frontend developer with experience in
        React. You will work closely with the design and backend team to build
        dynamic web applications...
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
  onClick={handleApply}
  className={`px-4 py-2 rounded ${
    applied ? "bg-gray-400 cursor-not-allowed" : "bg-[#064420] text-white"
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
