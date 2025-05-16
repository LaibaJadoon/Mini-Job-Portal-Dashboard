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
    <div className="flex items-center justify-between px-16 py-6 max-w-7xl mx-auto h-[calc(100vh-80px)]">
      {/* Left side */}
      <div className="pl-6 max-w-2xl text-[#064420]">
        <h1
          className="text-[2.75rem] font-extrabold mb-4 leading-snug"
          style={{
            textShadow: '2px 2px 6px #b2b29f',
            letterSpacing: '0.04em',
          }}
        >
          <span className="block">UNLOCK YOUR</span>
          <span className="block">CAREER POTENTIALS</span>
          <span className="block">WITH CAREER CONNECTS</span>
        </h1>
        <p className="text-base mb-6 text-[#064420cc]">
          Discover thousands of career paths tailored to your strengths. Let Career Connects help you unlock new opportunities and grow your professional journey.
        </p>
        <div className="space-x-4">
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
      <div className="pr-6 max-w-sm">
        <img
          src={job3dImage}
          alt="3D Job"
          className="rounded-xl shadow-xl transform hover:scale-125 transition-all duration-500"
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
