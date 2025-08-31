// src/pages/CollegeLife.jsx
import React from "react";
import { collegeIntro, semesters } from "../components/CollegeLifeData";

// Reuse the given GradientCard implementation
function GradientCard({ children }) {
  return (
    <div className="relative w-full mb-6">
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
      <div
        className="relative rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,17,22,0.92), rgba(12,14,18,0.92))",
          boxShadow:
            "0 0 0 1px rgba(120,200,255,0.18) inset, 0 8px 28px rgba(0,0,0,0.45)",
          zIndex: 1,
          color: "white",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function GpaPill({ gpa }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,200,255,0.18), rgba(0,200,255,0.08))",
        border: "1px solid rgba(120,200,255,0.25)",
      }}
    >
      GPA: {gpa}
    </span>
  );
}

function HtmlBlock({ html }) {
  return (
    <p
      className="text-[17px] text-blue-200 leading-7 opacity-90 text-justify"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function CollegeLife() {
  return (
    <section className="bg-gray-900 mx-auto px-5 py-12">
      <h2 className="text-3xl font-extrabold text-blue-500 mb-4">
        College Life
      </h2>

      {/* Intro */}
      <GradientCard>
        <div className="p-5 sm:p-6">
          <HtmlBlock html={collegeIntro} />
        </div>
      </GradientCard>

      {/* Semester cards */}
      {semesters.map((sem, i) => {
        const reverse = i % 2 === 1;

        return (
          <GradientCard key={sem.id}>
            <div className="p-5 md:p-7">
              <div
                className={`flex flex-col md:gap-8
            ${reverse ? "md:flex-row-reverse" : "md:flex-row"} 
            md:items-center`} // <-- center vertically at md+
              >
                {/* Image column */}
                <div className="flex-shrink-0">
                  {sem.img ? (
                    <div className="overflow-hidden rounded-xl border border-[rgba(120,200,255,0.25)] w-full max-w-[260px] mx-auto md:w-[260px]">
                      <img
                        src={sem.img}
                        alt={`${sem.title} highlight`}
                        className="w-full aspect-square object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                </div>

                {/* Text column */}
                <div className="flex-1 mt-5 md:mt-0">
                  <div className="flex items-start gap-3 mb-3">
                    <h3 className="text-2xl text-blue-400 md:text-3xl font-extrabold leading-tight">
                      {sem.title}
                    </h3>
                    <div className="ml-auto">
                      <GpaPill gpa={sem.gpa} />
                    </div>
                  </div>

                  <p className="text-[16px] text-blue-200 leading-7 opacity-90 text-justify">
                    {sem.paragraph}
                  </p>
                </div>
              </div>
            </div>
          </GradientCard>
        );
      })}
    </section>
  );
}
