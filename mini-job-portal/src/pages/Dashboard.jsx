import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/slices/authSlice";
import Header from "../components/Header";
import Home from "../components/Home"; 
import AboutUs from "../components/AboutUs";
import HowToApply from "../components/HowTpApply";
import Categories from "../components/Categories";
import ContactUs from "../components/ContactUs";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    // Do NOT remove 'jobPortalUser'
    localStorage.setItem("isAuthenticated", "false");
    navigate("/");
  };

    return (
    <div className="relative">
      <Header /> {/* Fixed header */}
      <main className="pt-[80px]"> {/* Padding to avoid overlap under fixed header */}
        <section id="home">
          <Home />
        </section>
        <AboutUs /> 
        <HowToApply/>
        <Categories/>
        <ContactUs/>
      </main>
    </div>
  );

}
