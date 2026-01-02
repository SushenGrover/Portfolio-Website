// src/pages/Internships.jsx
import React, { useState } from "react";
import { internships } from "../components/InternshipData";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 1, y: 0 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export default function Internships() {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const openImageModal = (image, title) => {
    if (!image) return;
    setModalImage(image);
    setModalTitle(title);
    setShowModal(true);
  };

  return (
    <section className="bg-gray-900 py-8 px-4 md:py-12 md:px-12">
      <h2 className="text-3xl font-extrabold text-blue-500 mb-4">
        Internships
      </h2>
      <div className="grid gap-8">
        {internships.map((internship, idx) => (
          <div
            key={internship.id}
            className="relative w-full"
            variants={cardVariants}
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
              variants={cardVariants}
            />
            <motion.div
              custom={idx}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              variants={cardVariants}
              className="relative bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 md:p-8 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* LEFT COLUMN: Logo & Certificate */}
                {/* UPDATED: flex-row for mobile (side-by-side), flex-col for desktop */}
                <div className="flex flex-row md:flex-col gap-4 flex-shrink-0 items-center md:items-start">
                  {/* Company Logo */}
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden bg-white border-3 border-cyan-400/80 flex items-center justify-center">
                    <img
                      src={internship.companyLogo}
                      alt={`${internship.company} Logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Certificate Preview (Only if finished/available) */}
                  {internship.certificate && (
                    <div
                      className="w-32 md:w-40 group cursor-pointer"
                      onClick={() =>
                        openImageModal(
                          internship.certificate,
                          `${internship.company} Certificate`
                        )
                      }
                    >
                      <div className="relative rounded-lg overflow-hidden border border-cyan-400/30">
                        <img
                          src={internship.certificate}
                          alt="Certificate"
                          className="w-full h-24 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                          <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                            View Cert
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN: Text content */}
                <div className="flex-1 grid gap-3">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {internship.role}
                    </h3>
                    <p className="text-cyan-200 text-sm md:text-base mt-1">
                      <span className="font-semibold text-lg">
                        {internship.company}
                      </span>
                      <span className="mx-2">•</span>
                      {internship.location}
                      <span className="mx-2">•</span>
                      <span className="text-blue-300">
                        {internship.startDate} - {internship.endDate}
                      </span>
                    </p>
                  </div>

                  <p className="text-gray-200 text-justify leading-relaxed text-sm md:text-base border-l-2 border-cyan-500/50 pl-4">
                    {internship.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {internship.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs md:text-sm px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-100 whitespace-nowrap"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl">
            {/* Gradient border */}
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
            <div className="relative rounded-2xl bg-gray-900 shadow-2xl overflow-hidden border border-white/5">
              <button
                className="align-middle text-center absolute top-3 right-3 h-9 w-9 grid rounded-full
                           text-slate-300 text-2xl hover:text-white hover:bg-white/10 transition z-50 bg-black/20"
                onClick={() => setShowModal(false)}
              >
                x
              </button>
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {modalTitle}
                </h3>
                <img
                  src={modalImage}
                  alt={modalTitle}
                  className="max-h-[80vh] w-auto rounded-xl object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
