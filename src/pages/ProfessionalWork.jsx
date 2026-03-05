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
    image: "/images/powerplay.png",
    link: "https://powerplayturf.vercel.app",
  },
  {
    id: "02",
    client: "Rainbow Cafe",
    role: "Frontend Developer",
    year: "2025",
    desc: "High-performance animation site for a premium cafe.",
    color: "bg-orange-900",
    image: "/images/rainbow.png",
    link: "https://rainbowcafe.vercel.app/",
  },
  {
    id: "03",
    client: "Biswajit Gym",
    role: "Frontend Developer",
    year: "2026",
    desc: "Frontend for a local gym with class schedules and trainer bios.",
    color: "bg-blue-900",
    image: "/images/gym.png",
    link: "https://biswajitgym.vercel.app/",
  },
  {
    id: "04",
    client: "Shopkart E-Commerce",
    role: "E-Commerce",
    year: "2025",
    desc: "Full-scale MERN stack platform with dynamic rendering and secure auth.",
    color: "bg-indigo-900",
    image: "/images/shopkart.png",
    link: "https://shopkart-aditya.vercel.app/",
  },
  {
    id: "05",
    client: "Time For Woodfire",
    role: "E-Commerce",
    year: "2026",
    desc: "Frontend for a woodfire pizza place with menu, gallery, and contact info.",
    color: "bg-indigo-900",
    image: "/images/woodfire.png",
    link: "https://time-for-woodfire.vercel.app/",
  },
  {
    id: "06",
    client: "Wow Wow Cafe",
    role: "E-Commerce",
    year: "2026",
    desc: "Frontend for a trendy cafe with menu, gallery, and contact info.",
    color: "bg-indigo-900",
    image: "/images/wowwow.png",
    link: "https://wowwowcafe.vercel.app/",
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

  // src/pages/ProfessionalWork.jsx

  // 1. Add a ref to store the latest mouse coordinates
  const mousePos = useRef({ x: 0, y: 0 });

  // --- FLOATING PREVIEW LOGIC WITH SCROLL FIX ---
  useEffect(() => {
    const movePreview = (e) => {
      // Save coordinates to use during scroll
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!previewRef.current) return;

      gsap.to(previewRef.current, {
        x: e.clientX + 20,
        y: e.clientY - 100,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleScroll = () => {
      const { x, y } = mousePos.current;
      if (x === 0 && y === 0) return;

      // Manually check what element is under the cursor during the scroll
      const hoveredElement = document.elementFromPoint(x, y);
      const row = hoveredElement?.closest(".client-row");

      if (row) {
        // If the cursor is over a project row, show its image
        const jobId = row.getAttribute("data-job-id");
        const job = clientWork.find((j) => j.id === jobId);
        if (job) setActiveJob(job);
      } else {
        // If the cursor is over a blank area, hide the image
        setActiveJob(null);
      }
    };

    window.addEventListener("mousemove", movePreview);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", movePreview);
      window.removeEventListener("scroll", handleScroll);
    };
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
      {/* --- FLOATING PREVIEW WINDOW --- */}
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
            className={`flex-1 ${activeJob?.color} relative p-0 flex items-center justify-center transition-colors duration-300`}
          >
            {activeJob?.image ? (
              <img
                src={activeJob.image}
                alt={activeJob.client}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : null}

            <h3 className="absolute z-10 font-black text-2xl uppercase text-white/20 tracking-widest text-center pointer-events-none">
              {activeJob?.client}
            </h3>
          </div>
        </div>
      </div>

      {/* --- PAGE CONTENT --- */}
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
            <div className="w-1/5">Action</div>
          </div>

          {/* The List */}
          <div className="flex flex-col">
            {clientWork.map((job) => {
              // Determine if this specific row is the active one
              const isActive = activeJob?.id === job.id;

              return (
                <div
                  key={job.id}
                  data-job-id={job.id}
                  // Removed 'group' and replaced 'hover:bg...' with conditional class
                  className={`client-row py-10 border-t border-neutral-800 flex flex-col md:flex-row md:items-center gap-6 md:gap-0 transition-colors px-4 relative ${
                    isActive ? "bg-neutral-900/50" : ""
                  }`}
                  onMouseEnter={() => setActiveJob(job)}
                  onMouseLeave={() => setActiveJob(null)}
                >
                  {/* Column 1 */}
                  {/* Replaced 'group-hover:text-blue-500' with conditional text color */}
                  <div
                    className={`w-full md:w-1/4 font-mono text-sm transition-colors ${
                      isActive ? "text-blue-500" : "text-neutral-500"
                    }`}
                  >
                    /{job.id} — {job.year}
                  </div>

                  {/* Column 2 */}
                  <div className="w-full md:w-2/4">
                    {/* Replaced 'group-hover:text-white' with conditional text color */}
                    <h3
                      className={`text-3xl font-bold uppercase mb-1 transition-colors ${
                        isActive ? "text-white" : "text-neutral-200"
                      }`}
                    >
                      {job.client}
                    </h3>
                    <p className="text-neutral-500 text-xs font-mono">
                      {job.role}
                    </p>
                  </div>

                  {/* Column 3: Visit Button */}
                  <div className="w-full md:w-1/5 flex md:justify-end">
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-neutral-700 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 z-10"
                    >
                      View Case ↗
                    </a>
                  </div>

                  {/* Hover Line */}
                  {/* Replaced 'group-hover:w-full' with conditional width (w-full vs w-0) */}
                  <div
                    className={`absolute bottom-0 left-0 h-[1px] bg-blue-600 transition-all duration-500 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default ProfessionalWork;
