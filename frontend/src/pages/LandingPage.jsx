import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, LogIn, Settings } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const getActiveClass = (path) =>
    location.pathname === path
      ? "bg-[#0ec1e7] text-[#0ec1e7]"
      : "text-gray-300";

  const isMobile = windowWidth < 768;

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <div className={`fixed top-4 ${isOpen ? "right-4" : "left-4"} z-50`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-[#060d2a] rounded-md text-white hover:bg-[#0ec1e7] transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`Sidebar bg-[#0ec1e7]  border-r top-0 left-0 min-h-screen flex fixed overflow-hidden z-40 transition-all duration-300 ease-in-out
          ${
            isMobile
              ? isOpen
                ? "w-64 opacity-100"
                : "w-0 opacity-0"
              : "w-60"
          }`}
      >
        <div className="flex flex-col items-start h-full w-full m-4">
          {/* Brand */}
          <h2 className="text-white text-xl md:text-2xl font-bold mb-8">
            NEXT<span className="text-[#000000]">OP</span>
          </h2>

          {/* Menu */}
          <div className="flex flex-col gap-4 w-full">
            <Link
              to="/login"
              className={`flex items-center gap-2 hover:bg-[#4b4f59] ${getActiveClass(
                "/login"
              )} hover:text-[#0ec1e7] duration-200 w-full p-2 pl-4 rounded-md cursor-pointer text-sm md:text-base`}
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 hover:bg-[#4b4f59] ${getActiveClass(
                "/dashboard"
              )} hover:text-[#0ec1e7] duration-200 w-full p-2 pl-4 rounded-md cursor-pointer text-sm md:text-base`}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/settings"
              className={`flex items-center gap-2 hover:bg-[#4b4f59] ${getActiveClass(
                "/settings"
              )} hover:text-[#0ec1e7] duration-200 w-full p-2 pl-4 rounded-md cursor-pointer text-sm md:text-base`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-[#020617] bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;
