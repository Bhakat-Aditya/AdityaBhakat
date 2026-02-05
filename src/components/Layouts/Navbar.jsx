// src/components/Layouts/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Helper for class names
  const linkClass = (path, color) =>
    `px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-widest transition-all duration-300 ${isActive(path) ? `bg-${color}-600 text-white font-bold` : `text-neutral-400 hover:text-${color}-500`}`;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] md:w-auto">
      <div className="flex items-center justify-center gap-1 p-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full shadow-2xl overflow-x-auto">
        <Link to="/" className={linkClass("/", "neutral")}>
          HQ
        </Link>

        {/* NEW LINK */}
        <Link to="/about" className={linkClass("/about", "yellow")}>
          Bio
        </Link>

        <Link to="/my-projects" className={linkClass("/my-projects", "red")}>
          Projects
        </Link>

        <Link to="/professional" className={linkClass("/professional", "blue")}>
          Client_Work
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
