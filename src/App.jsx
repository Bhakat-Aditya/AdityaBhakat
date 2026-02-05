// src/App.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "lenis"; // Import Lenis
import Hero from "./pages/Hero";
import Skills from "./pages/Skills";
import Work from "./pages/Work";
import Contact from "./pages/Contact";

function App() {
  const cursorRef = useRef();

  // --- 1. SMOOTH SCROLL SETUP ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Industry standard easing
      direction: "vertical",
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // --- 2. CUSTOM CURSOR SETUP ---
  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1, // Fast follow
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="bg-neutral-950 min-h-screen text-white selection:bg-red-500 selection:text-white cursor-none">
      {/* CUSTOM CURSOR ELEMENT */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <div className="w-1 h-1 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <Hero />
      <Skills />
      <Work />
      <Contact />

      <footer className="py-6 text-center text-neutral-800 text-xs font-mono uppercase">
        <p>© 2026 Aditya Bhakat. System All Green.</p>
      </footer>
    </div>
  );
}

export default App;
