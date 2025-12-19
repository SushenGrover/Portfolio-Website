// frontend/src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", color: "blue" },
    { path: "/projects", label: "Projects", color: "blue" },
    { path: "/certifications", label: "Certifications", color: "blue" },
    { path: "/collegelife", label: "College Life", color: "blue" },
    { path: "/design", label: "Design", color: "blue" },
    { path: "/dsa", label: "DSA", color: "blue" },
  ];

  return (
    <>
      <nav className="bg-gray-800 text-white shadow-lg sticky w-full top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between md:justify-center py-4 px-4 md:px-0">
          {/* Mobile menu button */}
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative w-10 h-10 flex flex-col justify-center items-center md:hidden group"
          >
            <span
              className={`block w-6 h-[3px] rounded-full bg-blue-400 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "rotate-45 translate-y-[-2px] bg-cyan-400 shadow-[0_0_8px_rgba(0,211,243,255)]"
                  : "mb-1 group-hover:shadow-[0_0_8px_rgba(0,211,243,255)]"
              }`}
            ></span>
            <span
              className={`block w-6 h-[3px] rounded-full bg-blue-400 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "opacity-0"
                  : "mb-1 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.8)]"
              }`}
            ></span>
            <span
              className={`block w-6 h-[3px] rounded-full bg-blue-400 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "-rotate-45 -translate-y-[8px] bg-cyan-400 shadow-[0_0_8px_rgba(0,211,243,255)]"
                  : "group-hover:shadow-[0_0_8px_rgba(0,211,243,255)]"
              }`}
            ></span>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:w-full md:justify-between text-lg font-medium pr-4 pl-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    px-6 py-2 rounded-full relative transition-all duration-300
                    flex items-center justify-center
                    ${
                      isActive
                        ? `bg-${item.color}-600 text-white shadow-[0_0_12px_4px_rgba(59,130,246,0.7)]`
                        : `text-${item.color}-400`
                    }
                    hover:text-white
                  `}
                >
                  <span
                    className={`
                      absolute inset-0 rounded-full pointer-events-none
                      transition-shadow duration-300
                      ${
                        !isActive
                          ? `hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.6)]`
                          : ""
                      }
                    `}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-gray-900 absolute w-full left-0 right-0 py-6 shadow-lg border-t border-gray-700"
            >
              <div className="flex flex-col items-center gap-4 text-lg font-medium">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        w-10/12 text-center py-2 px-6 rounded-full transition-all duration-300
                        ${
                          isActive
                            ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                            : "text-blue-400 hover:bg-gray-800 hover:shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* subtle gradient bar for consistency */}
              <div className="mt-6 h-[2px] w-32 mx-auto bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full opacity-80"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-[3px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-70"></div>
      </nav>
    </>
  );
}

export default Navbar;
