// src/pages/Skills.jsx
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DATA: Your Personal Armory ---
const skillSet = [
  {
    id: 1,
    name: "React.js",
    type: "Frontend Core",
    level: 90,
    rarity: "Legendary",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    name: "Node.js",
    type: "Backend Engine",
    level: 85,
    rarity: "Epic",
    color: "from-green-400 to-green-600",
  },
  {
    id: 3,
    name: "MongoDB",
    type: "Database",
    level: 80,
    rarity: "Rare",
    color: "from-green-600 to-emerald-800",
  },
  {
    id: 4,
    name: "GSAP",
    type: "Animation",
    level: 75,
    rarity: "Epic",
    color: "from-yellow-400 to-orange-600",
  },
  {
    id: 5,
    name: "Tailwind",
    type: "Styling",
    level: 95,
    rarity: "Legendary",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: 6,
    name: "Express",
    type: "Middleware",
    level: 80,
    rarity: "Rare",
    color: "from-gray-400 to-gray-600",
  },
];

// --- COMPONENT: The 3D Tilt Card ---
const HoloCard = ({ skill }) => {
  const cardRef = useRef();
  const glowRef = useRef();

  useGSAP(
    () => {
      const card = cardRef.current;

      // Mouse Move - 3D Tilt Calculation
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg rotation
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: "power2.out",
        });

        // Move the "Glow" gradient to follow mouse
        gsap.to(glowRef.current, {
          x: x,
          y: y,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        // Reset position
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: cardRef },
  );

  return (
    <div
      ref={cardRef}
      className="relative w-full h-64 rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden transform-style-3d cursor-crosshair group"
    >
      {/* Dynamic Glow Spot */}
      <div
        ref={glowRef}
        className={`absolute w-[200px] h-[200px] bg-gradient-to-r ${skill.color} blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 pointer-events-none`}
      ></div>

      {/* Content Layer */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <span
            className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded bg-neutral-800 text-white`}
          >
            {skill.rarity}
          </span>
          <span className="font-mono text-xs text-neutral-500">
            LVL.{skill.level}
          </span>
        </div>

        <div>
          <h3 className="text-3xl font-black uppercase italic">{skill.name}</h3>
          <p className="text-sm text-neutral-400 font-mono mt-1">
            {skill.type}
          </p>
        </div>

        {/* Progress Bar Animation */}
        <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden mt-4">
          <div
            className={`h-full bg-gradient-to-r ${skill.color} w-[${skill.level}%] shadow-[0_0_10px_currentColor]`}
          ></div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN SECTION ---
const Skills = () => {
  const container = useRef();

  useGSAP(
    () => {
      // Reveal Animation: Cards slide in and fan out
      gsap.from(".skill-card-wrapper", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%", // Starts when top of section hits 80% of viewport
        },
        y: 100,
        opacity: 0,
        rotateX: -45,
        stagger: 0.1, // Time between each card appearing
        duration: 1,
        ease: "back.out(1.7)",
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="min-h-screen bg-black text-white py-24 px-4 md:px-12"
    >
      {/* Section Header */}
      <div className="mb-20 border-l-4 border-red-600 pl-6">
        <h2 className="text-6xl font-black uppercase tracking-tighter mb-2">
          Weaponry <span className="text-neutral-600">&</span> Attributes
        </h2>
        <p className="text-neutral-400 max-w-xl">
          Current technical loadout prepared for deployment. Specialized in MERN
          stack architecture and high-performance frontend rendering.
        </p>
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
        {skillSet.map((skill) => (
          <div key={skill.id} className="skill-card-wrapper">
            <HoloCard skill={skill} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
