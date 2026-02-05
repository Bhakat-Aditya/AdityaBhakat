// src/components/Layouts/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-auto">
      <div className="flex items-center gap-1 p-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full shadow-2xl">
        {/* Home Link */}
        <Link
          to="/"
          className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 ${isActive("/") ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"}`}
        >
          HQ
        </Link>

        {/* Personal Projects Link */}
        <Link
          to="/my-projects"
          className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 ${isActive("/my-projects") ? "bg-red-600 text-white font-bold" : "text-neutral-400 hover:text-red-500"}`}
        >
          Projects
        </Link>

        {/* Professional Work Link */}
        <Link
          to="/professional"
          className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 ${isActive("/professional") ? "bg-blue-600 text-white font-bold" : "text-neutral-400 hover:text-blue-500"}`}
        >
          Client_Work
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
