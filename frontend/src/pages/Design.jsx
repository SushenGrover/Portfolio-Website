// src/pages/Design.jsx
import React, { useState } from "react";
import { designData } from "../assets/DesignData";
import { motion, AnimatePresence } from "framer-motion";

// 1. Reusable Gradient Card Wrapper (Same as before)
function GradientCard({ children, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full h-full cursor-pointer group"
      onClick={onClick}
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

      {/* Card Content */}
      <div
        className="relative rounded-2xl h-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,17,22,0.92), rgba(12,14,18,0.92))",
          boxShadow:
            "0 0 0 1px rgba(120,200,255,0.18) inset, 0 8px 28px rgba(0,0,0,0.45)",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

// 2. Helper to check if file is video
const isVideo = (path) => path.toLowerCase().endsWith(".mp4");

export default function Design() {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Open Modal
  const openModal = (design) => {
    setSelectedDesign(design);
    setCurrentSlide(0); // Reset to first image
  };

  // Close Modal
  const closeModal = () => {
    setSelectedDesign(null);
  };

  // Carousel Navigation
  const nextSlide = (e) => {
    e.stopPropagation();
    if (selectedDesign) {
      setCurrentSlide((prev) => (prev + 1) % selectedDesign.paths.length);
    }
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    if (selectedDesign) {
      setCurrentSlide((prev) =>
        prev === 0 ? selectedDesign.paths.length - 1 : prev - 1
      );
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen px-4 md:px-20 py-8 md:py-12">
      <h2
        className="text-blue-500 mb-8"
        style={{ fontSize: 28, fontWeight: 700 }}
      >
        Design Portfolio
      </h2>

      {/* Grid: 1 col mobile, 3 cols laptop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
        {designData.map((item) => (
          <GradientCard key={item.id} onClick={() => openModal(item)}>
            <div className="flex flex-col h-full">
              {/* Thumbnail Area */}
              <div className="h-48 w-full overflow-hidden relative border-b border-blue-500/20">
                {isVideo(item.paths[0]) ? (
                  <video
                    src={item.paths[0]}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    muted
                    loop
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => e.target.pause()}
                  />
                ) : (
                  <img
                    src={item.paths[0]}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                )}
                {/* Multiple Images Indicator (Instagram Style) */}
                {item.paths.length > 1 && (
                  <div className="absolute top-2 right-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-white drop-shadow-md"
                    >
                      {/* Back Layer (Top Right) */}
                      <path d="M20 2H10c-1.1 0-2 .9-2 2v2h2V4h10v10h-2v2h2c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                      {/* Front Layer (Bottom Left) */}
                      <path d="M4 22h10c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Inside the Text Info section of your Card */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>

                    {/* Date Display */}
                    <span className="text-xs text-gray-500 font-mono mt-1 whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Description (if you have one) or remove if not */}
                  {/* <p className="text-gray-400 text-sm line-clamp-3">{item.description}</p> */}
                </div>

                <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:underline">
                  View Design <span>→</span>
                </div>
              </div>
            </div>
          </GradientCard>
        ))}
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedDesign && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient border (Outer Ring) */}
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

              {/* Main Modal Box */}
              <div className="relative rounded-2xl bg-gray-900 shadow-2xl overflow-hidden border border-white/5">
                {/* Close Button */}
                <button
                  className="align-middle text-center absolute top-3 right-3 h-9 w-9 grid rounded-full
                             text-slate-300 text-2xl hover:text-white hover:bg-white/10 transition z-10"
                  onClick={closeModal}
                >
                  x
                </button>

                <div className="p-6 flex flex-col items-center">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {selectedDesign.title}
                  </h3>

                  {/* Media Content with Arrows */}
                  <div className="relative w-full flex items-center justify-center">
                    {/* Left Arrow (for carousel) */}
                    {selectedDesign.paths.length > 1 && (
                      <button
                        onClick={prevSlide}
                        className="absolute left-0 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-cyan-500/50 transition"
                      >
                        ←
                      </button>
                    )}

                    {/* Image or Video */}
                    {isVideo(selectedDesign.paths[currentSlide]) ? (
                      <video
                        controls
                        autoPlay
                        loop
                        className="max-h-[70vh] w-auto object-contain"
                        src={selectedDesign.paths[currentSlide]}
                      />
                    ) : (
                      <img
                        src={selectedDesign.paths[currentSlide]}
                        alt={selectedDesign.title}
                        className="max-h-[70vh] w-auto object-contain"
                      />
                    )}

                    {/* Right Arrow (for carousel) */}
                    {selectedDesign.paths.length > 1 && (
                      <button
                        onClick={nextSlide}
                        className="absolute right-0 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-cyan-500/50 transition"
                      >
                        →
                      </button>
                    )}
                  </div>

                  {/* Carousel Dots */}
                  {selectedDesign.paths.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {selectedDesign.paths.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            idx === currentSlide ? "bg-cyan-400" : "bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {/* Lost work note */}
        <p className="mt-4 italic text-blue-200 text-base max-w-md mx-auto md:mx-0">
          And much more, now lost to time....
        </p>
      </AnimatePresence>
    </section>
  );
}
