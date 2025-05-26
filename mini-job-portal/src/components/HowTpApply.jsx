import React from "react";
import { FaUserPlus, FaSearch, FaPaperPlane, FaBriefcase } from "react-icons/fa";

export default function HowToApply() {
  return (
    <section
      id="how-to-apply"
      className="bg- text-[#011c0d] py-16 px-6 md:px-20 text-center"
    >
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Get hired in 4 quick easy steps
      </h2>
      <p className="text-md md:text-lg max-w-2xl mx-auto mb-12 text-gray-700">
        The quickest and most effective way to get hired by the top firms
        working in your career interest area.
      </p>

      {/* Steps */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
        {/* Step 1 */}
        <div className="flex flex-col items-center bg-[#F5F5DC] p-6 rounded-2xl shadow-lg w-full max-w-[250px]">
          <FaUserPlus className="text-4xl text-[#064420] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
          <p className="text-sm text-gray-600">
            Sign up with your details and set up your job profile.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center bg-[#F5F5DC] p-6 rounded-2xl shadow-lg w-full max-w-[250px]">
          <FaSearch className="text-4xl text-[#064420] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Search Job</h3>
          <p className="text-sm text-gray-600">
            Explore thousands of jobs tailored to your interests.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center bg-[#F5F5DC] p-6 rounded-2xl shadow-lg w-full max-w-[250px]">
          <FaPaperPlane className="text-4xl text-[#064420] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Apply for Job</h3>
          <p className="text-sm text-gray-600">
            Apply directly with your resume and cover letter.
          </p>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center bg-[#F5F5DC] p-6 rounded-2xl shadow-lg w-full max-w-[250px]">
          <FaBriefcase className="text-4xl text-[#064420] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Get Hired</h3>
          <p className="text-sm text-gray-600">
            Receive interview calls and get placed successfully.
          </p>
        </div>
      </div>
    </section>
  );
}
