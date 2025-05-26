import React from "react";
import {
  FaPaintBrush,
  FaCode,
  FaMobileAlt,
  FaChartLine,
  FaBullhorn,
  FaDatabase,
  FaTools,
  FaPeopleCarry,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: <FaPaintBrush size={30} />, title: "Design", jobs: "200+ Jobs" },
  { icon: <FaCode size={30} />, title: "Web Development", jobs: "250+ Jobs" },
  { icon: <FaMobileAlt size={30} />, title: "App Development", jobs: "280+ Jobs" },
  { icon: <FaChartLine size={30} />, title: "Marketing", jobs: "190+ Jobs" },
  { icon: <FaBullhorn size={30} />, title: "Advertising", jobs: "230+ Jobs" },
  { icon: <FaDatabase size={30} />, title: "Data Science", jobs: "220+ Jobs" },
  { icon: <FaTools size={30} />, title: "Engineering", jobs: "210+ Jobs" },
  { icon: <FaPeopleCarry size={30} />, title: "Human Resources", jobs: "240+ Jobs" },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#011c0d] text-[#F5F5DC] py-16 px-6 md:px-20" id="categories">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">
          Countless Career Options are waiting for you to Explore
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
       {categories.map((category, index) => (
  <div key={index} className="flex justify-center">
    <div
      className="bg-[#F5F5DC] text-[#011c0d] rounded-2xl p-6 shadow-md text-center hover:shadow-lg transition duration-300 w-full max-w-[300px]"
    >
      <div className="text-[#064420] mb-4 flex justify-center">{category.icon}</div>
      <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
      <p className="text-sm text-gray-800">{category.jobs}</p>
    </div>
  </div>
))}
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/jobs")}
          className="bg-[#F5F5DC] text-[#064420] px-6 py-3 rounded-full font-semibold hover:bg-[#e4e4c4] transition"
        >
          View All Jobs
        </button>
      </div>
    </section>
  );
}
