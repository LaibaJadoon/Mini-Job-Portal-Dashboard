import React from 'react';
import { useNavigate } from 'react-router-dom';
import job3dImage from '../assets/job-3d.png';

export default function Home() {
  const navigate = useNavigate();

  const handleBrowseJobs = () => {
    navigate('/jobs');
  };

  const scrollToHowToApply = () => {
    const section = document.getElementById('how-to-apply');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex sm:flex-row flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-10 max-w-7xl mx-auto h-auto lg:h-[calc(100vh-80px)]">
      {/* Left side */}
      <div className="text-[#064420] max-w-2xl w-full text-center lg:text-left mt-8 lg:mt-0 flex flex-col items-center lg:items-start">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold mb-4 leading-snug"
          style={{
            textShadow: '2px 2px 6px #b2b29f',
            letterSpacing: '0.04em',
          }}
        >
          <span className="block">UNLOCK YOUR</span>
          <span className="block">CAREER POTENTIALS</span>
          <span className="block">WITH CAREER CONNECTS</span>
        </h1>
        <p className="text-sm sm:text-base mb-6 text-[#064420cc] max-w-md">
          Discover thousands of career paths tailored to your strengths. Let Career Connects help you unlock new opportunities and grow your professional journey.
        </p>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full sm:w-auto">
          <button
            onClick={handleBrowseJobs}
            className="bg-[#064420] text-[#F5F5DC] px-5 py-2.5 rounded font-semibold hover:bg-[#054215] transition"
          >
            Browse Jobs
          </button>
          <button
            onClick={scrollToHowToApply}
            className="border-2 border-[#064420] text-[#064420] px-5 py-2.5 rounded font-semibold hover:bg-[#064420] hover:text-[#F5F5DC] transition"
          >
            How it Works
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-auto flex justify-center mb-10 lg:mb-0">
        <img
          src={job3dImage}
          alt="3D Job"
          className="rounded-xl shadow-xl transform hover:scale-125 transition-all duration-500
            w-[220px] sm:w-[280px] md:w-[320px] lg:w-[360px]"
          style={{
            filter: 'drop-shadow(6px 6px 10px #033011)',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        />
      </div>
    </div>
  );
}
