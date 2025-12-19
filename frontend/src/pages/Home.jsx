// frontend\src\pages\Home.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profilePhoto from "../assets/profile_photo.png";

export default function Home() {
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (!showResume) return;
    const onKey = (e) => {
      if (e.key === "Escape") setShowResume(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showResume]);

  const resumeUrl = "/SushenGrover_Resume.pdf";

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Main unified container for hero and description */}
      <div className="max-w-6xl mx-auto px-5 md:px-20 py-12 md:py-16 flex flex-col gap-8 md:gap-10">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-10 md:gap-20">
          <div className="flex-1 text-center md:text-left space-y-5 md:max-w-xl">
            <h1 className="text-4xl md:text-5xl">
              Hello,
              <br />
              I&apos;m{" "}
              <span className="font-bold whitespace-nowrap bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Sushen Grover
              </span>
            </h1>

            <p className="mt-4 italic text-blue-200 text-base max-w-md mx-auto md:mx-0">
              “Consistency will always have the last laugh.”
            </p>

            <h2 className="text-xl md:text-1xl text-gray-300 font-semibold">
              <span className="text-blue-300">Software Development</span> |{" "}
              <span className="text-cyan-300">Artificial Intelligence</span> |{" "}
              <span className="text-purple-300">Data Science</span>
            </h2>

            {/* NEW: View Resume button row */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowResume(true)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 py-2.5 px-5 rounded-3xl hover:cursor-pointer text-white font-semibold transition"
              >
                View Resume
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <div className="absolute inset-0 rounded-full border-4 border-blue-400 shadow-[0_0_10px_7px_rgba(95,165,250,0.6)] blur-lg" />
              <img
                src={profilePhoto}
                alt="My Profile"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-blue-500 shadow-lg relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-6 px-0">
          <p className="text-[#D7F2FE] text-lg leading-relaxed text-justify">
            Hello, I'm Sushen Grover, a Computer Science and Engineering student
            at VIT Chennai with a strong curiosity for how technology shapes the
            world around us. My journey in this field has been guided by a blend
            of structured learning and self-driven exploration.
          </p>
          <p className="text-[#D7F2FE] text-lg leading-relaxed text-justify">
            Beyond the technical side, I place great value on the mindset I
            bring to my work. I am someone who believes in maintaining a calm,
            quiet, and no-noise approach to challenges, regardless of the
            environment. At the heart of my professional and personal outlook is
            a forward-looking attitude. I believe growth comes from
            adaptability, and I continuously strive to expand my knowledge by
            embracing new technologies, tools, and ideas.
          </p>
        </div>
      </div>

      {/* Modal: View Resume */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            key="resume-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            onClick={(e) => {
              // close if user clicks the dark backdrop
              if (e.target === e.currentTarget) setShowResume(false);
            }}
          >
            {/* Gradient ring wrapper */}
            <motion.div
              key="resume-card"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative w-full max-w-4xl"
            >
              {/* Animated gradient border ring */}
              <div
                className="
                  pointer-events-none
                  absolute -inset-[3px] rounded-2xl
                  bg-[conic-gradient(at_10%_10%,#60a5fa_0deg,#22d3ee_140deg,#a855f7_280deg,#60a5fa_360deg)]
                  opacity-90
                  [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
                  [mask-composite:exclude]
                  p-[2px]
                "
              />

              {/* Card */}
              <div className="relative rounded-2xl bg-[#151a21] text-[#EAF3FF] shadow-2xl overflow-hidden border border-white/5">
                {/* Top bar */}
                <div className="h-[3px] w-full from-blue-500 via-cyan-400 to-purple-500 opacity-80" />

                {/* Close button */}
                <button
                  className="align-middle text-center absolute top-3 right-3 h-9 w-9 grid rounded-full
                             text-slate-300 text-2xl hover:text-white hover:bg-white/10 transition"
                  onClick={() => setShowResume(false)}
                  aria-label="Close modal"
                >
                  x
                </button>

                {/* Scrollable content: PDF iframe */}
                <div
                  className="
                    custom-scroll
                    p-4 md:p-5
                    max-h-[85vh] overflow-auto
                    [scrollbar-width:thin] [scrollbar-color:#22d3ee_transparent]
                  "
                >
                  <style>{`
                    .custom-scroll::-webkit-scrollbar { width: 10px; }
                    .custom-scroll::-webkit-scrollbar-track {
                      background: rgba(255,255,255,0.06);
                      border-radius: 999px;
                    }
                    .custom-scroll::-webkit-scrollbar-thumb {
                      background: linear-gradient(180deg,#60a5fa,#22d3ee,#a855f7);
                      border-radius: 999px;
                      border: 2px solid transparent;
                      background-clip: padding-box;
                    }
                    .custom-scroll::-webkit-scrollbar-thumb:hover { filter: brightness(1.1); }
                  `}</style>

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                      Resume{" "}
                      <span className="text-cyan-400">— PDF Preview</span>
                    </h3>
                    <a
                      href="https://sushengrover.onrender.com/SushenGrover_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-7 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold py-2 px-4 rounded-lg"
                      title="Open in new tab"
                    >
                      Open in new tab
                    </a>
                  </div>

                  <div className="rounded-xl border border-white/10 overflow-hidden bg-black/20">
                    <iframe
                      src={resumeUrl}
                      title="Resume PDF"
                      className="w-full h-[75vh] bg-[#0f1318]"
                    />
                  </div>

                  {/* Fallback message */}
                  <p className="mt-3 text-sm text-slate-300">
                    If the preview doesn’t load, click “Open in new tab” above
                    to view or download the PDF.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
