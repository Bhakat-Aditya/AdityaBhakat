// src/pages/About.jsx
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageWrapper from "../components/Layouts/PageWrapper";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    year: "2026 (Target)",
    title: "MBA in Marketing & Sales",
    inst: "Future Goal",
    desc: "Combining technical prowess with business strategy.",
  },
  {
    year: "2025",
    title: "Full Stack Development",
    inst: "Intellipaat",
    desc: "Mastering MERN Stack, System Design, and Deployment pipelines.",
  },
  {
    year: "2023 - 2025",
    title: "B.Com Honours",
    inst: "Calcutta University",
    desc: "Final Year Student. Building financial acumen alongside coding.",
  },
  {
    year: "2023",
    title: "Higher Secondary",
    inst: "Midnapore",
    desc: "Foundation in Commerce.",
  },
];

const About = () => {
  const container = useRef();

  useGSAP(
    () => {
      // Reveal Text
      gsap.from(".about-text", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
      });

      // Draw Line Animation
      gsap.from(".timeline-line", {
        height: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top center",
        },
      });

      // Reveal Timeline Items
      gsap.from(".timeline-item", {
        x: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 60%",
        },
      });
    },
    { scope: container },
  );

  return (
    <PageWrapper>
      <div
        ref={container}
        className="min-h-screen bg-neutral-950 text-white pt-32 px-4 md:px-20 pb-20"
      >
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col md:flex-row gap-12 mb-32">
          <div className="w-full md:w-1/2">
            <h1 className="about-text text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">
              The <span className="text-red-600">Story</span>
            </h1>
            <div className="w-full h-[400px] bg-neutral-800 rounded-2xl overflow-hidden relative about-text">
              {/* PLACEHOLDER FOR YOUR PHOTO */}
              {/* <img src="/images/my-photo.jpg" className="w-full h-full object-cover" /> */}
              <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-mono text-xs">
                [INSERT_OPERATOR_PHOTO]
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h3 className="about-text text-2xl font-bold mb-6 text-red-500">
              // FROM COMMERCE TO CODE
            </h3>
            <p className="about-text text-lg text-neutral-300 leading-relaxed mb-6">
              I am <span className="text-white font-bold">Aditya Bhakat</span>,
              a final-year B.Com Honours student who hacked the system. While my
              degree says "Accounting," my passion screams "Full Stack Development."
            </p>
            <p className="about-text text-neutral-400 leading-relaxed mb-6">
              I realized early on that balance sheets weren't enough. I wanted
              to build. Currently, I am pivoting hard into **Full Stack
              Engineering**, building scalable applications that solve real
              problems.
            </p>
            <p className="about-text text-neutral-400 leading-relaxed">
              **The Endgame?** An MBA in Marketing & Sales. I don't just want to
              build the product; I want to know how to sell it to the world.
            </p>
          </div>
        </div>

        {/* --- QUALIFICATIONS TIMELINE --- */}
        <div className="timeline-section relative">
          <h2 className="text-4xl font-black uppercase mb-16 border-b border-neutral-800 pb-4 inline-block">
            Timeline & <span className="text-blue-600">Credentials</span>
          </h2>

          <div className="relative border-l-2 border-neutral-800 ml-4 md:ml-10 space-y-12">
            {/* Animated Line Overlay */}
            <div className="timeline-line absolute top-0 left-[-2px] w-[2px] bg-blue-600 h-full"></div>

            {education.map((item, index) => (
              <div key={index} className="timeline-item relative pl-8 md:pl-16">
                {/* Dot */}
                <div className="absolute top-2 left-[-5px] w-3 h-3 bg-black border-2 border-blue-600 rounded-full z-10"></div>

                <span className="font-mono text-xs text-blue-500 mb-1 block">
                  {item.year}
                </span>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {item.title}
                </h3>
                <h4 className="text-neutral-500 font-mono text-sm mb-2">
                  {item.inst}
                </h4>
                <p className="text-neutral-400 max-w-md">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default About;
