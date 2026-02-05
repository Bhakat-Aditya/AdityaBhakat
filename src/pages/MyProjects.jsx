// src/pages/MyProjects.jsx
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PageWrapper from "../components/Layouts/PageWrapper";

const personalProjects = [
  {
    id: "01",
    title: "ShopKart",
    stack: "MERN Stack",
    desc: "Full E-commerce engine with Redux state management.",
    color: "bg-blue-900",
  },
  {
    id: "02",
    title: "ChatApp v2",
    stack: "Socket.io",
    desc: "Real-time messaging with encrypted rooms.",
    color: "bg-purple-900",
  },
  {
    id: "03",
    title: "WeatherOS",
    stack: "React Native",
    desc: "Mobile weather app using OpenWeather API.",
    color: "bg-orange-900",
  },
  {
    id: "04",
    title: "Portfolio v1",
    stack: "HTML/CSS",
    desc: "My first static portfolio website.",
    color: "bg-neutral-800",
  },
];

const MyProjects = () => {
  const container = useRef();
  const previewRef = useRef();
  const [activeProject, setActiveProject] = useState(null);

  useGSAP(
    () => {
      // Initial List Animation
      gsap.from(".project-row", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: container },
  );

  // --- FLOATING PREVIEW LOGIC ---
  useEffect(() => {
    const movePreview = (e) => {
      if (!previewRef.current) return;

      // Move the preview to follow mouse
      gsap.to(previewRef.current, {
        x: e.clientX + 20, // Offset to right
        y: e.clientY - 100, // Offset to center vertically
        duration: 0.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", movePreview);
    return () => window.removeEventListener("mousemove", movePreview);
  }, []);

  // Animate Preview In/Out
  useEffect(() => {
    if (activeProject) {
      gsap.to(previewRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(previewRef.current, { scale: 0, opacity: 0, duration: 0.2 });
    }
  }, [activeProject]);

  return (
    <>
      {/* 🚨 FIX: Placed OUTSIDE PageWrapper so it doesn't scroll with the page transform */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 w-[300px] h-[200px] z-[999] pointer-events-none opacity-0 scale-0 origin-bottom-left"
      >
        <div className="w-full h-full bg-neutral-900 rounded-xl border border-neutral-700 shadow-2xl overflow-hidden flex flex-col">
          {/* Window Header */}
          <div className="h-6 bg-neutral-800 border-b border-neutral-700 flex items-center px-3 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="ml-auto text-[8px] font-mono text-neutral-500">
              PROJECT_PREVIEW
            </span>
          </div>

          {/* Window Content */}
          <div
            className={`flex-1 ${activeProject?.color} relative p-4 flex items-center justify-center transition-colors duration-300`}
          >
            <h3 className="font-black text-2xl uppercase text-white/20 tracking-widest transform -rotate-12 text-center">
              {activeProject?.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Page Content Starts Here */}
      <PageWrapper>
        <div
          ref={container}
          className="min-h-screen bg-neutral-950 text-white pt-32 px-4 md:px-20 pb-20 relative"
        >
          {/* Header */}
          <div className="mb-20 border-b border-neutral-800 pb-10">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Lab <span className="text-red-600">Experiments</span>
            </h1>
            <p className="font-mono text-neutral-400">
              // INDEX: PERSONAL_REPOS <br />
              Experimental code and open-source contributions.
            </p>
          </div>

          {/* List Header */}
          <div className="hidden md:flex text-xs font-mono text-neutral-600 uppercase tracking-widest mb-6 px-4">
            <div className="w-1/4">ID // Stack</div>
            <div className="w-2/4">Project Name</div>
            <div className="w-1/4">Description</div>
          </div>

          {/* The List */}
          <div className="flex flex-col">
            {personalProjects.map((project) => (
              <div
                key={project.id}
                className="project-row group py-10 border-t border-neutral-800 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-0 hover:bg-neutral-900/50 transition-colors cursor-pointer px-4 relative"
                onMouseEnter={() => setActiveProject(project)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className="w-full md:w-1/4 font-mono text-neutral-500 text-sm group-hover:text-red-500 transition-colors">
                  /{project.id} —{" "}
                  <span className="text-xs uppercase border border-neutral-800 px-1 rounded">
                    {project.stack}
                  </span>
                </div>

                <div className="w-full md:w-2/4">
                  <h3 className="text-4xl font-black uppercase mb-1 text-neutral-200 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                </div>

                <div className="w-full md:w-1/4 text-neutral-400 text-sm leading-relaxed">
                  {project.desc}
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default MyProjects;
