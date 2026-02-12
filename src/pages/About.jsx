// src/pages/About.jsx
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageWrapper from "../components/Layouts/PageWrapper";

gsap.registerPlugin(ScrollTrigger);

// --- DATA: Education Timeline ---
const education = [
  {
    year: "2026 (Target)",
    title: "MBA in Marketing & Sales",
    inst: "Future Goal",
    desc: "The endgame: Merging technical architecture with business strategy.",
  },
  {
    year: "2025 - present",
    title: "Full Stack Certification",
    inst: "Intellipaat / IIT Roorkee",
    desc: "Mastering the MERN ecosystem. Building complex, scalable systems from scratch.",
  },
  {
    year: "2023 - present",
    title: "B.Com Honours",
    inst: "Calcutta University",
    desc: "Final Year. Developed strong analytical skills and financial logic.",
  },
  {
    year: "2023",
    title: "Higher Secondary",
    inst: "Midnapore",
    desc: "Commerce Stream. The foundation of my disciplined work ethic.",
  },
];

// --- DATA: Personal Stats ---
const personalStats = [
  { label: "Location", value: "Midnapore, West Bengal", icon: "📍" },
  { label: "Email", value: "bhakataditya0@gmail.com", icon: "📧" },
  { label: "Phone", value: "+91 94764 77956", icon: "📞" },
  { label: "Status", value: "Open to Work", icon: "🟢" },
];

const About = () => {
  const container = useRef();

  useGSAP(
    () => {
      // 1. Image & ID Card Reveal (Using fromTo for safety)
      gsap.fromTo(
        ".profile-section",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
      );

      // 2. Text Reveal (Using fromTo for safety)
      gsap.fromTo(
        ".bio-text",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      // 3. Timeline Animation - FIXED: "fromTo" prevents the stuck visibility bug
      gsap.fromTo(
        ".timeline-item",
        { y: 50, opacity: 0 }, // Start State
        {
          y: 0,
          opacity: 1, // End State
          stagger: 0.2,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 80%", // Triggers a bit earlier so you don't miss it
            toggleActions: "play none none reverse", // Replays if you scroll up
          },
        },
      );

      // 4. Center Line Animation
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 80%",
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <PageWrapper>
      <div
        ref={container}
        className="min-h-screen bg-[#050505] text-white pt-32 px-4 md:px-20 pb-20 overflow-hidden"
      >
        {/* --- BACKGROUND AMBIENCE --- */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* --- MAIN SPLIT LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-16 mb-32 items-start">
          {/* LEFT COL: PHOTO & CONTACT ID */}
          <div className="profile-section w-full lg:w-[400px] flex-shrink-0 flex flex-col gap-6">
            {/* 1. PORTRAIT CONTAINER */}
            <div className="relative group">
              {/* Glowing Frame */}
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-transparent to-red-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>

              <div className="relative w-full aspect-square bg-neutral-900 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Your Image */}
                <img
                  src="https://res.cloudinary.com/adityabhakat/image/upload/v1770916989/dp_q5ij56.jpg"
                  alt="Aditya Bhakat"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                />

                {/* Tech Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="font-mono text-xs text-blue-400">
                    ID: ADITYA_BHAKAT
                  </p>
                  <p className="font-mono text-[10px] text-neutral-500">
                    SYS_ADMIN // FULL_STACK
                  </p>
                </div>
              </div>
            </div>

            {/* 2. CONTACT / INFO CARD (Glassmorphism) */}
            <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-400 border-b border-white/5 pb-2">
                Personal_Data
              </h4>
              {personalStats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group"
                >
                  <span className="text-neutral-500 text-sm font-mono flex items-center gap-2">
                    {stat.icon} {stat.label}
                  </span>
                  <span className="text-white text-sm font-bold text-right group-hover:text-blue-400 transition-colors">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COL: THE BIOGRAPHY */}
          <div className="w-full flex flex-col justify-center pt-4">
            <h1 className="bio-text text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500">
                Anomaly
              </span>
            </h1>

            <div className="space-y-6 text-lg text-neutral-400 leading-relaxed">
              <p className="bio-text border-l-4 border-blue-600 pl-6">
                <span className="text-white font-bold text-xl">
                  "Commerce by Degree, Coder by DNA."
                </span>{" "}
                <br />
                That’s the best way to describe my journey. Growing up, I was
                the kid glued to the computer screen, fascinated by how lines of
                code could create worlds. But coming from a business-focused
                family, the path of Commerce was chosen for me.
              </p>

              <p className="bio-text">
                I spent three years balancing ledgers and analyzing financial
                statements in my B.Com Honours. I learned discipline, logic, and
                the language of business. But the{" "}
                <span className="text-white font-bold">
                  itch to code never left
                </span>
                .
              </p>

              <p className="bio-text">
                Midway through my degree, I made a decision:{" "}
                <span className="text-white italic">Why not do both?</span> I
                realized I had the unique ability to merge financial logic with
                algorithmic problem-solving. I started pivoting hard—burning the
                midnight oil to master the MERN stack while aceing my college
                exams.
              </p>

              <p className="bio-text">
                Today, I am not just a developer; I am a strategist who builds.
                I work harder than the CS grads because I know I have ground to
                cover. I bring the{" "}
                <span className="text-red-500 font-bold">grit</span> of a
                self-taught engineer and the{" "}
                <span className="text-blue-500 font-bold">vision</span> of a
                business major.
              </p>
            </div>

            {/* QUALITIES GRID */}
            <div className="bio-text grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {["Relentless", "Adaptive", "Strategic", "Visionary"].map(
                (quality, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-center text-xs font-bold uppercase tracking-widest text-neutral-300 hover:bg-white hover:text-black transition-colors cursor-default"
                  >
                    {quality}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* --- TIMELINE SECTION --- */}
        <div className="timeline-section relative mt-20">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-[2px] bg-white/20"></div>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Chronicles <span className="text-neutral-600">&</span> Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Center Line (Hidden on mobile) - Added timeline-line class for animation */}
            <div className="timeline-line hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent -translate-x-1/2 origin-top"></div>

            {education.map((item, index) => (
              <div
                key={index}
                className={`timeline-item relative p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:border-white/20 transition-all duration-500 hover:-translate-y-2 ${index % 2 === 0 ? "md:mr-12 md:text-right" : "md:ml-12 md:mt-24"}`}
              >
                {/* Connecting Dot */}
                <div
                  className={`hidden md:block absolute top-10 w-4 h-4 rounded-full border-2 border-black z-10 ${index % 2 === 0 ? "-right-[66px] bg-blue-500" : "-left-[66px] bg-purple-500"}`}
                ></div>

                <span className="inline-block px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-400">
                  {item.year}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <h4 className="text-sm font-mono text-neutral-500 mb-4 uppercase tracking-widest">
                  {item.inst}
                </h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default About;
