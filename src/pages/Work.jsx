// src/pages/Work.jsx
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const missions = [
  {
    id: "01",
    title: "ShopKart",
    category: "E-Commerce",
    description:
      "Full-scale MERN stack platform with dynamic rendering and secure auth.",
    stack: ["React", "Node", "Mongo"],
    color: "bg-blue-600",
  },
  {
    id: "02",
    title: "Rainbow Cafe",
    category: "Hospitality",
    description: "Sensory-focused UI with smooth scroll and reservation logic.",
    stack: ["GSAP", "React", "Firebase"],
    color: "bg-orange-500",
  },
  {
    id: "03",
    title: "Powerplay Turf",
    category: "Business Logic",
    description:
      "Sports turf management system with booking slots and admin dashboard.",
    stack: ["MERN", "Twilio", "Chart.js"],
    color: "bg-green-600",
  },
];

const Work = () => {
  const container = useRef();
  const rightSection = useRef();
  const [activeMission, setActiveMission] = useState(0);

  useGSAP(
    () => {
      // 1. PIN THE MONITOR (Desktop Only)
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        pin: rightSection.current,
        scrub: 1,
        // Only pin if screen is wider than 768px
        invalidateOnRefresh: true,
        enabled: window.innerWidth > 768,
      });

      // 2. DETECT ACTIVE MISSION
      missions.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `#mission-${index}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveMission(index);
              // Glitch Effect
              gsap.fromTo(
                ".monitor-screen",
                { filter: "brightness(2)", scale: 0.98 },
                { filter: "brightness(1)", scale: 1, duration: 0.2 },
              );
            }
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative flex flex-col md:flex-row bg-neutral-950 text-white"
    >
      {/* LEFT: SCROLLABLE CONTENT */}
      <div className="w-full md:w-1/2">
        {missions.map((mission, index) => (
          <div
            key={index}
            id={`mission-${index}`}
            className="min-h-[80vh] md:h-screen flex flex-col justify-center px-6 md:px-12 border-b md:border-b-0 md:border-r border-neutral-900 py-12 md:py-0"
          >
            <h3 className="text-red-500 font-mono text-sm mb-4">
              MISSION_{mission.id}
            </h3>
            <h2 className="text-5xl md:text-6xl font-black uppercase mb-6 leading-tight">
              {mission.title}
            </h2>

            {/* --- MOBILE ONLY PREVIEW --- */}
            {/* This ensures mobile users see the visual/color too */}
            <div
              className={`block md:hidden w-full aspect-video rounded-lg mb-8 ${mission.color} relative overflow-hidden shadow-2xl`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xs text-white/50">
                  PREVIEW RENDER
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-base md:text-lg mb-8 max-w-md leading-relaxed">
              {mission.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {mission.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 border border-neutral-800 rounded-full text-xs text-neutral-500 font-mono uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: PINNED MONITOR (Hidden on Mobile) */}
      <div
        ref={rightSection}
        className="hidden md:flex w-1/2 h-screen justify-center items-center bg-black/20 backdrop-blur-sm sticky top-0"
      >
        <div className="w-[80%] aspect-video bg-neutral-900 rounded-xl border border-neutral-800 p-2 relative overflow-hidden">
          <div
            className={`monitor-screen w-full h-full rounded bg-neutral-800 relative overflow-hidden transition-colors duration-500 ${missions[activeMission].color}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl font-black text-white/20 uppercase tracking-widest">
                {missions[activeMission].title}
              </h1>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-30 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
