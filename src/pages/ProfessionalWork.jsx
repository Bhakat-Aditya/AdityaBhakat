// src/pages/ProfessionalWork.jsx
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PageWrapper from "../components/Layouts/PageWrapper";

const clientWork = [
  {
    id: "01",
    client: "Powerplay Turf",
    role: "Full Stack Engineer",
    year: "2025",
    desc: "Sports complex booking engine with admin dashboard.",
    color: "bg-green-900",
  },
  {
    id: "02",
    client: "Rainbow Cafe",
    role: "Frontend Developer",
    year: "2024",
    desc: "High-performance animation site for a premium cafe.",
    color: "bg-orange-900",
  },
  {
    id: "03",
    client: "FitTrack Gym",
    role: "Backend Architect",
    year: "2024",
    desc: "Membership portal API and database schema design.",
    color: "bg-blue-900",
  },
  {
    id: "04",
    client: "TechSolutions",
    role: "UI/UX Consultant",
    year: "2023",
    desc: "Redesigned corporate identity and landing pages.",
    color: "bg-indigo-900",
  },
];

const ProfessionalWork = () => {
  const container = useRef();
  const previewRef = useRef();
  const [activeJob, setActiveJob] = useState(null);

  useGSAP(
    () => {
      gsap.from(".client-row", {
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

      gsap.to(previewRef.current, {
        x: e.clientX + 20,
        y: e.clientY - 100,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", movePreview);
    return () => window.removeEventListener("mousemove", movePreview);
  }, []);

  useEffect(() => {
    if (activeJob) {
      gsap.to(previewRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(previewRef.current, { scale: 0, opacity: 0, duration: 0.2 });
    }
  }, [activeJob]);

  return (
    <>
      {/* 🚨 FIX: Placed OUTSIDE the PageWrapper so 'fixed' positioning works */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 w-[300px] h-[200px] z-[999] pointer-events-none opacity-0 scale-0 origin-bottom-left"
      >
        <div className="w-full h-full bg-neutral-900 rounded-xl border border-neutral-700 shadow-2xl overflow-hidden flex flex-col">
          <div className="h-6 bg-neutral-800 border-b border-neutral-700 flex items-center px-3 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="ml-auto text-[8px] font-mono text-neutral-500">
              CLIENT_PREVIEW
            </span>
          </div>
          <div
            className={`flex-1 ${activeJob?.color} relative p-4 flex items-center justify-center transition-colors duration-300`}
          >
            <h3 className="font-black text-2xl uppercase text-white/20 tracking-widest text-center">
              {activeJob?.client}
            </h3>
          </div>
        </div>
      </div>

      {/* Page Content starts here */}
      <PageWrapper>
        <div
          ref={container}
          className="min-h-screen bg-neutral-950 text-white pt-32 px-4 md:px-20 pb-20 relative"
        >
          {/* Header */}
          <div className="mb-20 border-b border-neutral-800 pb-10">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Client <span className="text-blue-600">Roster</span>
            </h1>
            <p className="font-mono text-neutral-400">
              // STATUS: PRODUCTION_GRADED <br />
              Commercial projects delivered to satisfied clients.
            </p>
          </div>

          {/* List Header */}
          <div className="hidden md:flex text-xs font-mono text-neutral-600 uppercase tracking-widest mb-6 px-4">
            <div className="w-1/4">Index // Year</div>
            <div className="w-2/4">Client // Role</div>
            <div className="w-1/4">Deliverable</div>
          </div>

          {/* The List */}
          <div className="flex flex-col">
            {clientWork.map((job) => (
              <div
                key={job.id}
                className="client-row group py-10 border-t border-neutral-800 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-0 hover:bg-neutral-900/50 transition-colors cursor-default px-4 relative overflow-hidden"
                onMouseEnter={() => setActiveJob(job)}
                onMouseLeave={() => setActiveJob(null)}
              >
                <div className="w-full md:w-1/4 font-mono text-neutral-500 text-sm group-hover:text-blue-500 transition-colors">
                  /{job.id} — {job.year}
                </div>

                <div className="w-full md:w-2/4">
                  <h3 className="text-3xl font-bold uppercase mb-1 text-neutral-200 group-hover:text-white transition-colors">
                    {job.client}
                  </h3>
                  <p className="text-neutral-500 text-xs font-mono">
                    {job.role}
                  </p>
                </div>

                <div className="w-full md:w-1/4 text-neutral-400 text-sm leading-relaxed">
                  {job.desc}
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-600 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default ProfessionalWork;
