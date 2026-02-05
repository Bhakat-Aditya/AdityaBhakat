import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const container = useRef();
  const textRef = useRef();
  const subTextRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Initial Blackout to Content Reveal
      tl.from(container.current, {
        backgroundColor: "#000",
        duration: 0,
      });

      // 2. Main Title Staggered Reveal (From Bottom)
      // We target the internal <span>s for the clip-path effect
      tl.from(".hero-title-char", {
        y: 150, // Push text down
        skewY: 7, // Skew it for speed effect
        duration: 1.5,
        stagger: 0.05,
        ease: "power4.out",
      });

      // 3. Subtext Fade In
      tl.from(
        subTextRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power2.out",
        },
        "-=1",
      ); // Overlap with previous animation

      // 4. "Player Stats" Lines expanding
      tl.from(
        ".stat-line",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "expo.out",
          stagger: 0.2,
        },
        "-=0.5",
      );

      // 5. Mouse Movement Parallax (Interactive)
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20; // Range -10 to 10
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".hero-content", {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative w-full h-screen bg-neutral-950 text-white overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Background Grid (Optional aesthetic) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Main Content Container */}
      <div className="hero-content relative z-10 text-center mix-blend-difference">
        {/* GAMIFIED HUD HEADER */}
        <div className="flex justify-center items-center gap-4 mb-6 opacity-80 font-mono text-xs tracking-widest text-red-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>ONLINE</span>
          </div>
          <div className="w-[1px] h-4 bg-neutral-700"></div>
          <div>LOC: WEST BENGAL</div>
        </div>

        {/* MASSIVE HERO TEXT - Split for animation */}
        <h1
          ref={textRef}
          className="text-[12vw] leading-[0.85] font-black tracking-tighter uppercase overflow-hidden"
        >
          <div className="overflow-hidden">
            {/* We map letters to spans for that 'stagger' effect */}
            {"ADITYA".split("").map((char, i) => (
              <span key={i} className="hero-title-char inline-block">
                {char}
              </span>
            ))}
          </div>
          <div className="overflow-hidden text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
            {"BHAKAT".split("").map((char, i) => (
              <span key={i} className="hero-title-char inline-block">
                {char}
              </span>
            ))}
          </div>
        </h1>

        {/* JOB TITLE / SUBTEXT */}
        <div ref={subTextRef} className="mt-8 flex flex-col items-center gap-4">
          <p className="text-xl md:text-2xl font-light text-neutral-400">
            Full Stack Developer{" "}
            <span className="text-neutral-700 mx-2">//</span> MERN Architect
          </p>

          {/* PLAYER STATS CARD */}
          <div className="mt-8 p-6 border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm rounded-xl flex gap-8 text-left">
            <div>
              <p className="text-xs text-neutral-500 uppercase mb-1">
                Level (Age)
              </p>
              <p className="text-xl font-bold font-mono">23</p>
              <div className="stat-line w-full h-[2px] bg-red-600 mt-2"></div>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase mb-1">
                Current Quest
              </p>
              <p className="text-xl font-bold font-mono">MBA Target</p>
              <div className="stat-line w-full h-[2px] bg-blue-600 mt-2"></div>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase mb-1">
                Main Weapon
              </p>
              <p className="text-xl font-bold font-mono">React.js</p>
              <div className="stat-line w-full h-[2px] bg-yellow-600 mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 animate-bounce">
        <p className="text-xs text-neutral-600 font-mono tracking-widest">
          SCROLL TO START
        </p>
      </div>
    </section>
  );
};

export default Hero;
