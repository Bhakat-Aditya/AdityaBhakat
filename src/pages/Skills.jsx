// src/pages/Skills.jsx
import React, { useRef, useMemo, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const skills = [
  { name: "React"},
  { name: "GSAP"},
  { name: "Node.js"},
  { name: "Three.js"},
  { name: "Tailwind"},
  { name: "MongoDB"},
  { name: "Express"},
  { name: "HTML" },
  { name: "CSS"},
  { name: "JavaScript"},
  { name: "Next.js" },
  { name: "Angular" },
  { name: "Git"},
  { name: "Figma"},
  { name: "Canva"},
  { name: "Davinchi Resolve"},
  { name: "TypeScript"},
];

// --- MATH UTILS ---
const getPointsOnSphere = (n) => {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push({
      x: Math.cos(theta) * radius,
      y: y,
      z: Math.sin(theta) * radius,
    });
  }
  return points;
};

// --- COMPONENT: Crystal Tag ---
const CrystalTag = ({ item, x, y, z, opacity, scale, blur }) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none will-change-transform"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: opacity,
        zIndex: Math.floor(scale * 1000),
        filter: `blur(${blur}px)`,
        // Instant update for scroll performance
      }}
    >
      <div className="relative px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_4px_20px_rgba(255,255,255,0.05)] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50"></div>
        <div className="flex items-center gap-3 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_currentColor]"></span>
          <span className="text-xl font-medium tracking-widest uppercase text-white/90">
            {item.name}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const Skills = () => {
  const container = useRef();
  const sphereRef = useRef();

  // State
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const points = useMemo(() => getPointsOnSphere(skills.length), []);
  const sphereRadius = 300;

  useGSAP(
    () => {
      // SCROLL DRIVEN ROTATION
      // We map scroll progress to random rotation axes
      const proxy = { rotX: 0, rotY: 0, rotZ: 0 };

      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "+=4000",
        pin: true,
        scrub: 1.5, // Smooth scrubbing
        onUpdate: (self) => {
          // As you scroll down (progress 0 -> 1):
          // Y rotates 2 full circles (Spin)
          // X rotates 1 full circle (Flip)
          // Z rotates 0.5 circle (Wobble)
          // This creates a "Random Tumble" effect controlled by scroll
          const p = self.progress * Math.PI * 2;

          gsap.to(proxy, {
            rotY: p * 2, // Fast spin
            rotX: p, // Medium flip
            rotZ: p * 0.5, // Slow tilt
            overwrite: true,
            ease: "none", // Linear mapping to scroll
            onUpdate: () =>
              setRotation({
                x: proxy.rotX,
                y: proxy.rotY,
                z: proxy.rotZ,
              }),
          });
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative h-screen bg-[#050505] text-white overflow-hidden flex flex-col items-center justify-center"
    >
      {/* --- LAYER 1: DEEP SPACE (Static) --- */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)] pointer-events-none"></div>

      {/* --- LAYER 2: TWINKLING STARS (Very Low Frequency) --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Only 20 stars (Minimalist) */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.4 + 0.1,
              // Very slow animation (5s to 10s)
              animation: `twinkle ${Math.random() * 5 + 5}s infinite ease-in-out alternate`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* --- LAYER 3: SHOOTING STARS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <style>{`
          @keyframes twinkle {
            0% { opacity: 0.1; transform: scale(0.8); }
            100% { opacity: 0.6; transform: scale(1.1); }
          }
          @keyframes shoot {
            0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 0; }
            10% { opacity: 1; }
            20% { transform: translateX(-300px) translateY(300px) rotate(-45deg); opacity: 0; }
            100% { opacity: 0; }
          }
        `}</style>
        <div className="absolute top-[10%] left-[80%] w-[150px] h-[1px] bg-gradient-to-l from-transparent via-cyan-100 to-transparent opacity-0 animate-[shoot_8s_infinite_2s]"></div>
        <div className="absolute top-[40%] left-[5%] w-[100px] h-[1px] bg-gradient-to-l from-transparent via-white to-transparent opacity-0 animate-[shoot_12s_infinite_5s]"></div>
      </div>

      {/* --- HEADER --- */}
      <div className="absolute top-20 z-10 text-center mix-blend-screen w-full px-4">
        <h2 className="text-6xl md:text-8xl font-thin tracking-tighter text-white mb-2 opacity-90">
          PROFI<span className="font-bold text-cyan-200">CIENCY</span>
        </h2>
        <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500 to-transparent mx-auto mb-4"></div>
        <p className="font-mono text-cyan-400 text-xs tracking-[0.5em] animate-pulse">
          SCROLL TO NAVIGATE
        </p>
      </div>

      {/* --- THE SPHERE --- */}
      <div className="relative w-full h-full flex items-center justify-center perspective-1000 z-10">
        <div
          ref={sphereRef}
          className="relative flex items-center justify-center"
          style={{ width: sphereRadius * 2, height: sphereRadius * 2 }}
        >
          {/* THE CORE */}
          <div className="absolute w-[1px] h-[1px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_40px_10px_rgba(255,255,255,0.8)]"></div>
          </div>

          {/* RENDER CRYSTAL TAGS */}
          {points.map((point, i) => {
            // 3D Rotation Calculation (Tumbling on X, Y, Z)

            // 1. Rotate around Y
            let x =
              point.x * Math.cos(rotation.y) - point.z * Math.sin(rotation.y);
            let z =
              point.z * Math.cos(rotation.y) + point.x * Math.sin(rotation.y);
            let y = point.y;

            // 2. Rotate around X
            let yNew = y * Math.cos(rotation.x) - z * Math.sin(rotation.x);
            let zNew = z * Math.cos(rotation.x) + y * Math.sin(rotation.x);
            y = yNew;
            z = zNew;

            // 3. Rotate around Z
            let xFinal = x * Math.cos(rotation.z) - y * Math.sin(rotation.z);
            let yFinal = y * Math.cos(rotation.z) + x * Math.sin(rotation.z);
            let zFinal = z;

            // --- VISIBILITY LOGIC ---
            // Map z (-1 to 1) to opacity & blur
            const normalizedZ = (zFinal + 1) / 2; // 0 (back) to 1 (front)

            // Opacity: Back is 0.15, Front is 1.0
            const opacity = Math.max(0.15, Math.pow(normalizedZ, 2));

            // Blur: Back is 6px, Front is 0px
            const blur = (1 - normalizedZ) * 6;

            // Scale: Back is 0.5, Front is 1.0
            const scale = 0.5 + normalizedZ * 0.5;

            const screenX = xFinal * sphereRadius;
            const screenY = yFinal * sphereRadius;

            return (
              <CrystalTag
                key={i}
                item={skills[i]}
                x={screenX}
                y={screenY}
                z={zFinal}
                opacity={opacity}
                scale={scale}
                blur={blur}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
