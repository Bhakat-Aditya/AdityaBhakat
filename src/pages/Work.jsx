// src/pages/Work.jsx
import PageWrapper from "../components/Layout/PageWrapper";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "ShopKart", category: "E-Commerce", level: "Hardcore" },
  { id: 2, title: "Rainbow Cafe", category: "Hospitality", level: "Creative" },
  {
    id: 3,
    title: "Powerplay Turf",
    category: "Booking System",
    level: "Enterprise",
  },
];

const Work = () => {
  const container = useRef();

  useGSAP(
    () => {
      // Parallax Effect on scroll
      const cards = gsap.utils.toArray(".project-card");

      cards.forEach((card) => {
        gsap.to(card, {
          y: -50,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Smooth scrubbing effect
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <PageWrapper>
      <div ref={container} className="container mx-auto px-4 py-20">
        <h1 className="animate-item text-8xl font-black mb-20 uppercase tracking-tighter">
          Selected <span className="text-red-500">Missions</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card animate-item group relative h-[400px] bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-20 transition-transform duration-500 group-hover:-translate-y-4">
                <span className="text-sm font-mono text-red-400 mb-2">
                  Lvl. {project.level}
                </span>
                <h2 className="text-4xl font-bold">{project.title}</h2>
                <p className="text-gray-400">{project.category}</p>
              </div>

              {/* Hover Animation Overlay */}
              <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              {/* Image Placeholder (Dynamic GSAP scale on hover) */}
              <div className="absolute inset-0 -z-10 bg-neutral-800 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Work;
