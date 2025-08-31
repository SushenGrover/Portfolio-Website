// src/pages/Certifications.jsx
import React, { useState } from "react";
import { certifications } from "../components/CertificationsData";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 1, y: 0 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export default function Certifications() {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const openImageModal = (image, title) => {
    setModalImage(image);
    setModalTitle(title);
    setShowModal(true);
  };

  return (
    <section className="bg-gray-900 py-8 px-4 md:py-12 md:px-12">
      <h2 className="text-3xl font-extrabold text-blue-500 mb-4">
        Certifications
      </h2>
      <div className="grid gap-8">
        {certifications.map((c, idx) => (
          <div key={c.id} className="relative w-full" variants={cardVariants}>
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
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Clickable Badge Image */}
                <div
                  className="w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden border border-cyan-400/30 flex-shrink-0 cursor-pointer"
                  onClick={() => openImageModal(c.image, c.name)}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={c.image}
                      alt={`${c.name} badge`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gray-500 opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Text content */}
                <div className="flex-1 grid gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {c.name}
                    </h3>
                    <p className="text-cyan-200 text-sm md:text-base">
                      <strong>{c.org}</strong> • Issued {c.issueDate}
                    </p>
                  </div>

                  <p
                    className="text-gray-200 text-justify leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: c.description }}
                  />

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {c.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs md:text-sm px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-100 whitespace-nowrap"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <div>
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-gray-900 bg-gradient-to-b from-cyan-400 to-cyan-500 shadow-md hover:from-cyan-500 hover:to-cyan-600 transition"
                    >
                      View Certification
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7"></path>
                        <path d="M7 7h10v10"></path>
                      </svg>
                    </a>
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
          <div className="relative w-full max-w-3xl">
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
                           text-slate-300 text-2xl hover:text-white hover:bg-white/10 transition"
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
                  className="max-h-[70vh] w-auto rounded-xl object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
