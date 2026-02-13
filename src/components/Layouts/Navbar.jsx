// src/components/Layouts/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Magnetic from "../Animations/Magnetic"; // Adjust path if needed

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Helper for class names
  const linkClass = (path, color) =>
    `relative z-10 block px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer ${
      isActive(path)
        ? `bg-${color}-600 text-white font-bold shadow-[0_0_20px_rgba(0,0,0,0.5)]`
        : `text-neutral-400 hover:text-${color}-500 hover:bg-white/5`
    }`;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-auto">
      <div className="flex items-center justify-center gap-2 p-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full shadow-2xl">
        <Magnetic>
          <div className="inline-block">
            {" "}
            {/* Wrapper needed for ref assignment */}
            <Link to="/" className={linkClass("/", "neutral")}>
              HQ
            </Link>
          </div>
        </Magnetic>

        <Magnetic>
          <div className="inline-block">
            <Link to="/about" className={linkClass("/about", "yellow")}>
              Bio
            </Link>
          </div>
        </Magnetic>

        <Magnetic>
          <div className="inline-block">
            <Link
              to="/my-projects"
              className={linkClass("/my-projects", "red")}
            >
              Projects
            </Link>
          </div>
        </Magnetic>

        <Magnetic>
          <div className="inline-block">
            <Link
              to="/professional"
              className={linkClass("/professional", "blue")}
            >
              Client_Work
            </Link>
          </div>
        </Magnetic>
      </div>
    </nav>
  );
};

export default Navbar;
