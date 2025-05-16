import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/slices/authSlice";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem("isAuthenticated", "false");
    navigate("/");
  };

  // Detect clicks outside of dropdown
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
        {" "}
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-14 w-14 object-contain" />
          <span className="text-xl font-bold"></span>
        </div>
        {/* Navigation */}
        <nav className="space-x-6 hidden md:flex text-base">
          <button
            onClick={() =>
              document
                .getElementById("home")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="transition hover:font-semibold hover:scale-[1.05]"
          >
            Home
          </button>

          <button
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="transition hover:font-semibold hover:scale-[1.05]"
          >
            About Us
          </button>

          <button
            onClick={() =>
              document
                .getElementById("how-to-apply")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="transition hover:font-semibold hover:scale-[1.05]"
          >
            How to Apply
          </button>

          <button
            onClick={() =>
              document
                .getElementById("categories")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="transition hover:font-semibold hover:scale-[1.05]"
          >
            Categories  
          </button>

          <Link
            to="/jobs"
            className="transition hover:font-semibold hover:scale-[1.05]"
          >
            Jobs
          </Link>

          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="transition hover:font-semibold hover:scale-[1.05]"
          >
            Contact Us
          </button>
        </nav>
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
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
              <Link
                to="/bookmarks"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Bookmarks
              </Link>
              <Link
                to="/applied-jobs"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Applied Jobs
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
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
