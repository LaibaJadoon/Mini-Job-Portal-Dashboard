import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JobDetailHeader from "../components/JobDetailHeader";
import Detail from "../components/Detail";
import { useSelector } from "react-redux";

export default function JobDetails() {
  const navigate = useNavigate();

 const job = useSelector((state) => state.jobs.selectedJob);

  if (!job) {
    return (
      <div className="p-6">
        <p className="text-red-600">No job data available.</p>
        <button
          className="mt-4 px-4 py-2 bg-[#064420] text-white rounded"
          onClick={() => navigate("/jobs")}
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#064420]">
      <JobDetailHeader />
      <div className="pt-28">
        <Detail job={job} />
      </div>
    </div>
  );
}
