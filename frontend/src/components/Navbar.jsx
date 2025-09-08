import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, LogIn, Settings } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const getActiveClass = (path) =>
    location.pathname === path ? "text-[#0ec1e7]" : "text-gray-300";

  const navItems = [
    { path: "/login", label: "Login", icon: LogIn },
    { path: "/dashboard", label: "User Dashboard", icon: Home },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  // check mobile width
  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <div className={`fixed top-4 ${isOpen ? "right-4" : "left-4"} z-50`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-[#030615] rounded-md text-white transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-[#030615] border-r border-[#0ec1e7] top-0 left-0 min-h-screen flex fixed z-40 transition-all duration-300 ease-in-out
          ${isMobile ? (isOpen ? "w-64 opacity-100" : "w-0 opacity-0") : "w-60"}`}
      >
        <div className="flex flex-col items-start h-full w-full m-4">
          {/* Brand */}
          <h2 className="text-white text-xl md:text-2xl font-bold mb-8">
            NEXT<span className="text-[#0ec1e7]">OP</span>
          </h2>

          {/* Menu */}
          <div className="flex flex-col gap-4 w-full">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 w-full p-2 pl-4 rounded-md cursor-pointer text-sm md:text-base
                  hover:bg-[#a4d9e6] hover:text-black duration-200 ${getActiveClass(path)}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-[#030615] bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;
