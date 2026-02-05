// src/pages/Contact.jsx
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const container = useRef();
  const formRef = useRef();

  // State to simulate "typing" logic or form handling
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  useGSAP(
    () => {
      // 1. CRT Turn-on Effect
      gsap.fromTo(
        container.current,
        { scaleY: 0.1, scaleX: 0.1, opacity: 0, filter: "brightness(5)" },
        {
          scaleY: 1,
          scaleX: 1,
          opacity: 1,
          filter: "brightness(1)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        },
      );

      // 2. Staggered Line Entry
      gsap.from(".terminal-line", {
        x: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-20 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background Matrix/Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full z-10">
        {/* Header Lines */}
        <div className="mb-10 opacity-80">
          <p className="terminal-line">
            root@aditya-portfolio:~$ initializing_uplink...
          </p>
          <p className="terminal-line">
            root@aditya-portfolio:~$ loading_module:{" "}
            <span className="text-white font-bold">CONTACT_PROTOCOL</span>
          </p>
          <p className="terminal-line text-yellow-500">
            WARNING: Looking for high-value projects only.
          </p>
        </div>

        {/* The "Terminal" Form */}
        <form
          ref={formRef}
          className="space-y-6 bg-neutral-900/50 p-8 border border-green-900/50 rounded-lg backdrop-blur-sm shadow-[0_0_50px_rgba(0,255,0,0.1)]"
        >
          {/* Name Field */}
          <div className="terminal-line group">
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">
              /User/Identity (Name)
            </label>
            <div className="flex items-center gap-2 border-b border-green-900 focus-within:border-green-500 transition-colors">
              <span className="text-green-500">{`>`}</span>
              <input
                type="text"
                placeholder="Enter_Designation"
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-neutral-700 h-10"
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="terminal-line group">
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">
              /User/Frequency (Email)
            </label>
            <div className="flex items-center gap-2 border-b border-green-900 focus-within:border-green-500 transition-colors">
              <span className="text-green-500">{`>`}</span>
              <input
                type="email"
                placeholder="Enter_Comm_Link"
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-neutral-700 h-10"
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="terminal-line group">
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">
              /User/Mission_Brief (Message)
            </label>
            <div className="flex items-start gap-2 border-b border-green-900 focus-within:border-green-500 transition-colors">
              <span className="text-green-500 mt-2">{`>`}</span>
              <textarea
                rows="4"
                placeholder="Describe_Objective..."
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-neutral-700 resize-none"
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="terminal-line mt-8 w-full bg-green-900/20 hover:bg-green-500 hover:text-black border border-green-500 text-green-500 py-4 uppercase font-bold tracking-[0.2em] transition-all duration-300 group"
          >
            <span className="animate-pulse mr-2">[</span>
            EXECUTE_SEND
            <span className="animate-pulse ml-2">]</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
