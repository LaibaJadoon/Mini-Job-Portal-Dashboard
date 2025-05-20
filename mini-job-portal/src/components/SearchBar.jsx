import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/slices/authSlice";
import { setSearchTerm } from "../app/slices/jobsSlice"; // updated action name
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function SearchBar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem("isAuthenticated", "false");
    navigate("/");
  };

const handleSearchChange = (e) => {
  const value = e.target.value;
  setSearchText(value);
  dispatch(setSearchTerm(value)); // live filtering on every keystroke
};

  const handleSearchSubmit = (e) => {
  e.preventDefault();
  dispatch(setSearchTerm(searchText)); // keeping for explicit search button press
};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#011c0d] text-[#F5F5DC] py-4 shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img src={logo} alt="Logo" className="h-14 w-14 object-contain" />
        </div>

        {/* Search bar */}
       <form
  onSubmit={handleSearchSubmit}
  className="flex w-full max-w-xl mx-6"
>
  <input
    type="text"
    placeholder="Search for jobs..."
    value={searchText}
    onChange={handleSearchChange}
    className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#064420] text-[#064420]"
  />
  <button
    type="submit"
    className="bg-[#064420] text-white px-4 rounded-r-lg"
  >
    Search
  </button>
</form>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle className="text-3xl" />
            <span>{user?.name}</span>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-[#064420] rounded shadow-lg z-50">
              <div
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/bookmarks");
                }}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Bookmarks
              </div>
              <div
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/applied-jobs");
                }}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Applied Jobs
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}