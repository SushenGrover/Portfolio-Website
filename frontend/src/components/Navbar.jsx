import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", color: "blue" },
    { path: "/projects", label: "Projects", color: "blue" },
    { path: "/certifications", label: "Certifications", color: "blue" },
    { path: "/collegelife", label: "College Life", color: "blue" },
    { path: "/academics", label: "Academics", color: "blue" },
    { path: "/dsa", label: "DSA", color: "blue" },
  ];

  return (
    <>
      <nav className="bg-gray-800 text-white shadow-lg sticky w-full top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-center items-center py-4">
          <div className="px-8 flex w-full justify-between text-lg font-medium">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              console.log(location.pathname, item.path, isActive);

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
      ${!isActive ? `hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.6)]` : ""}
    `}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="h-[3px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-70"></div>
      </nav>
    </>
  );
}

export default Navbar;
