// src/components/Layouts/Footer.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const container = useRef();

  useGSAP(
    () => {
      gsap.from(".footer-item", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
        },
      });
    },
    { scope: container },
  );

  return (
    <footer
      ref={container}
      className="relative bg-neutral-900 border-t border-neutral-800 text-white pt-20 pb-10 px-4 md:px-20 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12 md:gap-0 mb-20">
        {/* Brand Column */}
        <div className="footer-item md:w-1/3">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Aditya<span className="text-red-600">.</span>
          </h2>
          <p className="text-neutral-400 max-w-sm leading-relaxed">
            Forging high-performance digital products with MERN stack
            architecture. From Commerce roots to Engineering solutions.
          </p>
        </div>

        {/* Links Column */}
        <div className="footer-item md:w-1/3 flex gap-12">
          <div>
            <h4 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6">
              SITEMAP
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="hover:text-red-500 transition-colors">
                  HQ (Home)
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-red-500 transition-colors"
                >
                  About & Qualifications
                </Link>
              </li>
              <li>
                <Link
                  to="/my-projects"
                  className="hover:text-red-500 transition-colors"
                >
                  Lab Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/professional"
                  className="hover:text-red-500 transition-colors"
                >
                  Client Work
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6">
              SOCIALS
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://github.com/Bhakat-Aditya"
                  target="_blank"
                  className="hover:text-blue-500 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/aditya-bhakat-anshu/"
                  target="_blank"
                  className="hover:text-blue-500 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/ADITYABHAK4172"
                  target="_blank"
                  className="hover:text-blue-500 transition-colors"
                >
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Column */}
        <div className="footer-item md:w-1/3 text-right">
          <h4 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6">
            STATUS
          </h4>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/20 border border-green-800 rounded-full text-green-500 text-xs font-bold uppercase tracking-widest animate-pulse">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Open to Work
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-item border-t border-neutral-800 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 font-mono uppercase">
        <p>© 2026 Aditya Bhakat. All Rights Reserved.</p>
        <p>Built with React + GSAP + Tailwind</p>
      </div>
    </footer>
  );
};

export default Footer;
