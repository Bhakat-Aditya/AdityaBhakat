// src/components/Layout/PageWrapper.jsx
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PageWrapper = ({ children }) => {
  const container = useRef();

  useGSAP(
    () => {
      // Heavy Intro Animation
      const tl = gsap.timeline();

      tl.fromTo(
        container.current,
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" },
      );

      // Staggered child elements reveal
      tl.from(
        ".animate-item",
        {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="page-container w-full min-h-screen bg-black text-white overflow-hidden"
    >
      {children}
    </div>
  );
};

export default PageWrapper;
