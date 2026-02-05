// src/App.jsx
import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"; // Import Router
import gsap from "gsap";
import Lenis from "lenis";

// Components
import Navbar from "./components/Layouts/Navbar";
import Hero from "./pages/Hero";
import Skills from "./pages/Skills";
import Work from "./pages/Work"; // This remains the "Featured" section on Home
import Contact from "./pages/Contact";
import MyProjects from "./pages/MyProjects";
import ProfessionalWork from "./pages/ProfessionalWork";

// Wrapper to reset scroll on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const cursorRef = useRef();

  // --- SMOOTH SCROLL ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // --- CUSTOM CURSOR ---
  useEffect(() => {
    const cursor = cursorRef.current;
    const moveCursor = (e) => {
      if (!cursor || window.innerWidth < 768) return;
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="bg-neutral-950 min-h-screen text-white selection:bg-red-500 selection:text-white cursor-auto md:cursor-none">
      {/* GLOBAL ELEMENTS */}
      <ScrollToTop />
      <Navbar /> {/* The new floating nav */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <div className="w-1 h-1 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      {/* ROUTING LOGIC */}
      <Routes>
        {/* Route 1: HOME (The original one-page scroll) */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Skills />
              <Work /> {/* Featured Work */}
              <Contact />
            </>
          }
        />

        {/* Route 2: PERSONAL PROJECTS */}
        <Route path="/my-projects" element={<MyProjects />} />

        {/* Route 3: PROFESSIONAL WORK */}
        <Route path="/professional" element={<ProfessionalWork />} />
      </Routes>
      <footer className="py-6 text-center text-neutral-800 text-xs font-mono uppercase border-t border-neutral-900 mt-10">
        <p>© 2026 Aditya Bhakat. System All Green.</p>
      </footer>
    </div>
  );
}

// MAIN APP WRAPPER
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
