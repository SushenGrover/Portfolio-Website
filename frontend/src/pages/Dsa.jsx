// frontend/src/pages/DSA.jsx
import React, { useEffect, useState } from "react";

// IMPORTANT: Replace with your actual LeetCode username
const USERNAME = "SushenGrover";
// Use environment variables for API base URL in a real application
const API_BASE = "https://portfolio-website-rgpj.onrender.com";

import { motion } from "framer-motion";

const GlowSpinner = () => (
  <div className="flex items-center justify-center py-10">
    <motion.div
      initial={{ opacity: 0.6, scale: 0.9 }}
      animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1, 0.9], rotate: 360 }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-14 h-14 rounded-full"
      style={{
        boxShadow: "0 0 0 2px rgba(120,200,255,0.25) inset",
        background:
          "conic-gradient(from 0deg, #60a5fa, #22d3ee, #a855f7, #60a5fa)",
      }}
    >
      <div className="absolute inset-[4px] rounded-full bg-[#0f1116]" />
    </motion.div>
  </div>
);

// A simple, reusable component for displaying individual stats.
function StatPill({ label, value }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 4,
        padding: "10px 12px",
        borderRadius: 12,
        background:
          "linear-gradient(180deg, rgba(0,200,255,0.18), rgba(0,200,255,0.08))",
        border: "1px solid rgba(120,200,255,0.25)",
        minWidth: 120,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 13, opacity: 0.85 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 18 }}>{value}</div>
    </div>
  );
}

// A styled container card for different sections.
function GradientCard({ children, title }) {
  return (
    <div className="relative w-full mb-6 ">
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
      <div className="relative rounded-2xl mb-6">
        <span
          aria-hidden
          className="
            pointer-events-none absolute inset-0 rounded-2xl text-white 
            bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 
            opacity-70 [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] 
            [mask-composite:exclude]
          "
        />
        <div
          className="
            relative z-10 rounded-2xl text-white
            bg-gradient-to-b from-[rgba(15,17,22,0.92)] to-[rgba(12,14,18,0.92)]
            shadow-[inset_0_0_0_1px_rgba(120,200,255,0.18),0_8px_28px_rgba(0,0,0,0.45)]
          "
        >
          {title && (
            <div className="px-5 py-4 border-b border-[rgba(120,200,255,0.25)]">
              <h3 className="m-0 text-xl font-bold text-blue-400">{title}</h3>
            </div>
          )}
          <div className="p-[18px] text-white">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function DSA() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    let alive = true;
    const fetchLeetCodeData = async () => {
      try {
        const res = await fetch(`${API_BASE}/leetcode/${USERNAME}`);
        if (!res.ok) throw new Error(`Backend HTTP ${res.status}`);
        const data = await res.json();
        if (data.error) throw new Error(data.detail);

        if (alive) {
          setStats(data.stats || null);
          setRecent(data.recent || []);
          setBadges(data.badges || []);
        }
      } catch (e) {
        if (alive) {
          setErr(e.message || "Failed to fetch LeetCode data");
        }
      } finally {
        if (alive) {
          setLoading(false);
        }
      }
    };

    fetchLeetCodeData();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="academics-wrapper bg-gray-900 min-h-screen px-4 md:px-20 py-8 md:py-12">
      <h2
        style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}
        className="text-blue-500"
      >
        LeetCode
      </h2>

      {loading ? (
        <GradientCard>
          <div className="flex flex-col items-center gap-3">
            <GlowSpinner />
            <div className="text-cyan-200/90">Fetching LeetCode profile…</div>
            <div className="text-slate-300/80 text-sm">
              May take longer than usual ~5-20 seconds
            </div>
          </div>
        </GradientCard>
      ) : err ? (
        <GradientCard>
          <div style={{ color: "#fca5a5" }}>
            Error: {err}. Ensure the profile is public and the backend is
            running.
          </div>
        </GradientCard>
      ) : !stats ? (
        <GradientCard>
          <div>No LeetCode data found for this user.</div>
        </GradientCard>
      ) : (
        <>
          {/* Profile header */}
          <GradientCard>
            <div className="flex flex-col gap-4 md:grid md:grid-cols-[80px_1fr] md:gap-16 md:items-center">
              <img
                src="/leetcode_avatar.png"
                alt="LeetCode avatar"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 12,
                  border: "0px solid rgba(120,200,255,0.25)",
                  objectFit: "cover",
                  background: "rgba(20,24,32,0.6)",
                }}
                className="mx-auto md:mx-0"
              />
              <div className="text-blue-300 text-center md:text-left">
                <div style={{ fontSize: 20, fontWeight: 700 }}>
                  Sushen Grover • @SushenGrover
                </div>
                <div style={{ opacity: 0.85 }}>
                  Rank: <b>{stats.ranking}</b>
                  {stats.country !== "N/A" ? ` • ${stats.country}` : ""}
                </div>
                <div className="mt-3">
                  <a
                    href="https://leetcode.com/u/SushenGrover/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-gray-900 bg-gradient-to-b from-cyan-400 to-cyan-500 shadow-md hover:from-cyan-500 hover:to-cyan-600 transition"
                  >
                    View Profile
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
          </GradientCard>

          <GradientCard title="Badges">
            <div
              className="text-blue-300"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
                justifyContent: "center",
              }}
            >
              {badges.length > 0 ? (
                badges.map((badge) => (
                  <div
                    key={badge.id}
                    title={`${badge.name}\nEarned: ${new Date(
                      badge.creationDate * 1000
                    ).toLocaleDateString()}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      width: 100,
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={badge.icon}
                      alt={badge.name}
                      style={{
                        width: 72,
                        height: 72,
                        objectFit: "contain",
                        filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))",
                      }}
                    />
                    <span style={{ fontSize: 12, opacity: 0.9 }}>
                      {badge.name}
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center", width: "100%" }}>
                  No badges earned yet.
                </div>
              )}
            </div>
          </GradientCard>

          {/* Stats pills */}
          <GradientCard title="Problem Stats">
            <div className="flex flex-wrap gap-4 justify-center">
              <StatPill label="Solved" value={stats.allSolved} />
              <StatPill
                label={`Easy`}
                value={`${stats.easySolved}/${stats.easyTotal}`}
              />
              <StatPill
                label={`Medium`}
                value={`${stats.medSolved}/${stats.medTotal}`}
              />
              <StatPill
                label={`Hard`}
                value={`${stats.hardSolved}/${stats.hardTotal}`}
              />
            </div>
          </GradientCard>

          {/* Recent AC submissions */}
          <GradientCard title="Recent Accepted Submissions">
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  color: "#e6f2ff",
                }}
              >
                <thead>
                  <tr>
                    {["Title", "Time"].map((h, i, arr) => (
                      <th
                        key={h}
                        style={{
                          textAlign: i === 0 ? "left" : "center",
                          padding: "14px 12px",
                          fontWeight: 700,
                          position: "sticky",
                          top: 0,
                          background: "rgba(10,12,16,0.6)",
                          backdropFilter: "blur(4px)",
                          borderBottom: "1px solid rgba(120,200,255,0.35)",
                          color: "#d9f6ff",
                          borderRight:
                            i < arr.length - 1
                              ? "1px solid rgba(120,200,255,0.25)"
                              : "none",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recent.map((s) => (
                    <tr key={s.id}>
                      <td
                        style={{
                          padding: "12px",
                          borderTop: "1px solid rgba(120,200,255,0.18)",
                          borderRight: "1px solid rgba(120,200,255,0.18)",
                        }}
                      >
                        <a
                          href={`https://leetcode.com/problems/${s.titleSlug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#8de1ff", textDecoration: "none" }}
                        >
                          {s.title}
                        </a>
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "center",
                          borderTop: "1px solid rgba(120,200,255,0.18)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {new Date(Number(s.timestamp) * 1000).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {recent.length === 0 && (
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          padding: 16,
                          textAlign: "center",
                          borderTop: "1px solid rgba(120,200,255,0.18)",
                        }}
                      >
                        No recent accepted submissions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </GradientCard>
        </>
      )}
    </section>
  );
}
