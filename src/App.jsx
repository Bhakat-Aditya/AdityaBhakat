// src/App.jsx
import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import gsap from "gsap";
import Lenis from "lenis";

// Components
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer"; // Import Footer
import Hero from "./pages/Hero";
import Skills from "./pages/Skills";
import Work from "./pages/Work";
import MyProjects from "./pages/MyProjects";
import ProfessionalWork from "./pages/ProfessionalWork";
import About from "./pages/About"; // Import About

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const cursorRef = useRef();

  // Smooth Scroll & Cursor Logic (Same as before)
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

  // src/App.jsx
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Tell GSAP to handle the -50% centering so it doesn't conflict with Tailwind
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      if (window.innerWidth < 768) return;

      // Use duration: 0 for instant, sticky movement
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="bg-neutral-950 min-h-screen text-white selection:bg-red-500 selection:text-white cursor-auto md:cursor-none flex flex-col">
      <ScrollToTop />
      <Navbar />

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        // Removed: -translate-x-1/2 -translate-y-1/2
        className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      >
        <div className="w-1 h-1 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Main Content Area - Grow to fill space */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Skills />
                <Work />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/my-projects" element={<MyProjects />} />
          <Route path="/professional" element={<ProfessionalWork />} />
        </Routes>
      </main>

      {/* FOOTER IS NOW GLOBAL */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
