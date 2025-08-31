// frontend\src\pages\Projects.jsx
import React, { useState } from "react";
import { projects } from "../assets/ProjectsData";
import MarkdownRenderer from "../components/MarkdownRenderer";

function Projects() {
  const [showModal, setShowModal] = useState(false);
  const [readmeContent, setReadmeContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [currentRepo, setCurrentRepo] = useState("");
  const [currentBranch, setCurrentBranch] = useState("main");

  // Try main, then master
  const fetchReadme = async (repo, name) => {
    setModalTitle(name);
    setShowModal(true);
    setReadmeContent("Loading…");
    setCurrentRepo(repo);

    const tryBranch = async (branch) => {
      const url = `https://raw.githubusercontent.com/${repo}/${branch}/README.md`;
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        setCurrentBranch(branch);
        return text;
      }
      throw new Error("Not found");
    };

    try {
      const text = await tryBranch("main");
      setReadmeContent(text);
    } catch {
      try {
        const text = await tryBranch("master");
        setReadmeContent(text);
      } catch {
        setReadmeContent("README not found.");
      }
    }
  };

  return (
    <div className="projects-container p-5 min-h-screen bg-gray-900 text-white flex flex-col">
      <h2 className="text-3xl font-extrabold text-blue-500 mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
        {projects.map((proj, idx) => (
          <div key={idx} className="card p-6 rounded shadow bg-gray-800">
            <h2 className="text-xl text-blue-400 font-bold">{proj.name}</h2>
            {/* <p className="text-blue-300 mt-1">{proj.oneliner}</p> */}
            <p className="text-blue-300 mt-1 text-justify">
              {proj.description}
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <button
                className="bg-blue-600 hover:bg-blue-500 py-2 px-6 text-white rounded cursor-pointer"
                onClick={() => fetchReadme(proj.githubRepo, proj.name)}
              >
                View Readme
              </button>
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 py-2 px-6 hover:bg-gray-600 text-white rounded"
              >
                GitHub
              </a>
              {proj.deployment && (
                <a
                  href={proj.deployment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-700 py-2 px-6 text-white rounded hover:bg-cyan-600 transition"
                  title="Deployment"
                >
                  Deployment
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/70
            flex items-center justify-center
            p-4
          "
          role="dialog"
          aria-modal="true"
        >
          {/* Gradient ring wrapper */}
          <div className="relative w-full max-w-3xl">
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
              <div className="h-[3px] w-full from-blue-500 via-cyan-400 to-purple-500 opacity-80" />

              <button
                className="align-middle text-center absolute top-3 right-3 h-9 w-9 grid rounded-full
                           text-slate-300 text-2xl hover:text-white hover:bg-white/10 transition"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
              >
                x
              </button>

              {/* Scrollable content */}
              <div
                className="
                  custom-scroll
                  p-6 md:p-8
                  max-h-[78vh] overflow-auto
                  scroll-smooth
                  [scrollbar-width:thin] [scrollbar-color:#22d3ee_transparent]
                "
                /* NOTE: plain JS object; no TypeScript casts */
                style={{
                  "--track": "rgba(255,255,255,0.06)",
                  "--thumb": "#22d3ee",
                }}
              >
                <style>{`
                  /* WebKit scrollbar */
                  .custom-scroll::-webkit-scrollbar { width: 10px; }
                  .custom-scroll::-webkit-scrollbar-track {
                    background: var(--track);
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

                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-5 tracking-tight">
                  {modalTitle} <span className="text-cyan-400">— README</span>
                </h3>

                <div
                  className="
                  prose prose-invert max-w-none
                  prose-a:text-cyan-400 hover:prose-a:text-cyan-300
                  prose-strong:text-white
                  prose-hr:border-white/10
                  prose-code:text-cyan-300
                  prose-pre:bg-[#0f1318] prose-pre:border prose-pre:border-white/5 prose-pre:rounded-xl
                  prose-img:rounded-lg prose-img:my-6
                "
                >
                  <MarkdownRenderer repo={currentRepo} branch={currentBranch}>
                    {readmeContent}
                  </MarkdownRenderer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
