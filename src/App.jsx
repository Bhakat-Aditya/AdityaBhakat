// src/App.jsx
import React from "react";
import Hero from "./pages/Hero";
import Skills from "./pages/Skills";
import Work from "./pages/Work";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="bg-neutral-950 min-h-screen text-white selection:bg-red-500 selection:text-white">
      <Hero />
      <Skills />
      <Work />
      <Contact />

      {/* Simple Footer */}
      <footer className="py-6 text-center text-neutral-600 text-xs font-mono uppercase">
        <p>© 2026 Aditya Bhakat. System All Green.</p>
      </footer>
    </div>
  );
}

export default App;
