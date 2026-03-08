import React, { useRef } from "react";
import gsap from "gsap";

const DownloadResume = ({ driveLink }) => {
  const btnRef = useRef();
  const fillRef = useRef();
  const textRef = useRef();
  const iconRef = useRef();

  const handleMouseEnter = () => {
    // Sharp, clean fill from the left (like equipping a weapon)
    gsap.to(fillRef.current, {
      scaleX: 1,
      duration: 0.25,
      ease: "power3.out",
    });

    // Text and Icon turn black instantly for high contrast
    gsap.to([textRef.current, iconRef.current], {
      color: "#000000",
      duration: 0.1,
      delay: 0.05,
    });
  };

  const handleMouseLeave = () => {
    // Fill exits to the right smoothly
    gsap.to(fillRef.current, {
      scaleX: 0,
      duration: 0.25,
      ease: "power3.inOut",
    });

    // Text returns to white
    gsap.to([textRef.current, iconRef.current], {
      color: "#ffffff",
      duration: 0.2,
    });
  };

  const handleClick = () => {
    // Clean, tight weapon recoil (moves back and snaps into place)
    gsap.fromTo(
      btnRef.current,
      { x: 0 },
      {
        x: -12,
        duration: 0.06,
        yoyo: true,
        repeat: 3,
        ease: "power2.inOut",
      },
    );
  };

  return (
    <div className="flex justify-center mt-8">
      <a
        href={driveLink}
        target="_blank"
        rel="noopener noreferrer"
        ref={btnRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        // Clean Valorant-style chamfered edge on the bottom right
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 75%, 92% 100%, 0 100%)" }}
        className="relative flex items-center gap-4 px-8 py-4 bg-neutral-900 border border-neutral-700 overflow-hidden cursor-pointer group shadow-lg"
      >
        {/* The solid red fill (starts scaled to 0 on the X axis) */}
        <div
          ref={fillRef}
          className="absolute inset-0 bg-red-600 origin-left scale-x-0"
        ></div>

        {/* UI Accent - Tiny square dot in the corner */}
        <div className="absolute top-2 left-2 w-1 h-1 bg-neutral-500 group-hover:bg-black z-10 transition-colors duration-200"></div>

        {/* Content */}
        <span
          ref={textRef}
          className="relative z-10 font-mono text-sm md:text-base font-bold tracking-[0.15em] text-white uppercase"
        >
          Equip_Resume
        </span>

        {/* Icon */}
        <span ref={iconRef} className="relative z-10 text-white">
          <svg
            className="w-5 h-5 -rotate-90 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth="2.5"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </span>

        {/* Bottom accent line (gives it that tactical thickness) */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-800 group-hover:bg-red-800 transition-colors z-10"></div>
      </a>
    </div>
  );
};

export default DownloadResume;
