// src/pages/Academics.jsx
import React, { useEffect, useState } from "react";
import { cgpaDetails } from "../components/CGPA_details";
import { curriculumDetails } from "../components/Curriculum_details";

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
        }}
      >
        {children}
      </div>
    </div>
  );
}

const thStyle = (i, arrLen) => ({
  textAlign: i === 0 ? "left" : "center",
  padding: "14px 12px",
  fontWeight: 700,
  position: "sticky",
  top: 0,
  background: "rgba(10,12,16,0.6)",
  backdropFilter: "blur(4px)",
  borderBottom: "1px solid rgba(120,200,255,0.35)",
  color: "#d9f6ff",
  borderRight: i < arrLen - 1 ? "1px solid rgba(120,200,255,0.25)" : "none",
});

const tdStyle = (i, arrLen, alignLeftIdx = 0) => ({
  padding: "12px 12px",
  textAlign: i === alignLeftIdx ? "left" : "center",
  borderTop: "1px solid rgba(120,200,255,0.18)",
  borderRight: i < arrLen - 1 ? "1px solid rgba(120,200,255,0.18)" : "none",
  whiteSpace: i === alignLeftIdx ? "normal" : "nowrap",
});

function parseCSV(text) {
  if (typeof text !== "string") return [];
  // Remove BOM, normalize CRLF to LF
  const cleaned = text.replace(/^\uFEFF/, "").replace(/\r/g, "");
  const lines = cleaned.split("\n").filter((ln) => ln !== "");
  if (!lines.length) return [];

  // CSV splitter that supports simple quoted fields
  const splitCSV = (row) => {
    const out = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
      const ch = row[i];
      if (ch === '"') {
        if (inQuotes && row[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        out.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    out.push(cur);
    return out.map((s) => s.trim());
  };

  const headerLine = lines[0]; // <-- first line only
  const headers = splitCSV(headerLine);

  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line || /^\s*$/.test(line)) continue;
    const cols = splitCSV(line);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = cols[idx] ?? "";
    });
    rows.push(obj);
  }
  return rows;
}

export default function Academics() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    fetch("/Grade_History_23BCE1728.csv")
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load CSV: ${r.status}`);
        return r.text();
      })
      .then((text) => {
        if (!mounted) return;
        const data = parseCSV(text);

        const get = (o, keys, fallback = "") =>
          keys.find((k) => k in o && o[k] !== "")
            ? o[keys.find((k) => k in o && o[k] !== "")]
            : fallback;

        const mapped = data.map((r, idx) => ({
          sno: get(r, ["Sl.No", "S. No", "S.No", "Sl No"], String(idx + 1)),
          code: get(r, ["Course Code", "Course Cod", "CourseCode"]),
          name: get(r, ["Course Title", "Course Name", "CourseTitle"]),
          grade: get(r, ["Grade"]),
          credits: get(r, ["Credits", "Credit"]),
          examMonth: get(r, ["Exam Month", "Exam Mont"]),
        }));

        setRows(mapped);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="academics-wrapper bg-gray-900 min-h-screen px-4 md:px-20 py-8 md:py-12">
      {/* // CGPA Details table */}

      <h2
        className="text-blue-500"
        style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}
      >
        CGPA Details
      </h2>

      <GradientCard>
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full border-separate border-spacing-0 text-white">
            <thead>
              <tr>
                {[
                  "Credits Registered",
                  "Credits Earned",
                  "CGPA",
                  "S Grades",
                  "A Grades",
                  "B Grades",
                  "C Grades",
                  "D Grades",
                  "E Grades",
                  "F Grades",
                  "N Grades",
                ].map((h, i, arr) => (
                  <th
                    key={h}
                    className={`text-blue-400 font-bold sticky top-0 py-3.5 px-3 
                bg-gray-800 backdrop-blur-sm 
                border-b border-blue-200 
                ${i === 2 ? "text-left" : "text-center"} 
                ${i < arr.length - 1 ? "border-r border-blue-200" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[
                  cgpaDetails.creditsRegistered,
                  cgpaDetails.creditsEarned,
                  cgpaDetails.cgpa,
                  cgpaDetails.s,
                  cgpaDetails.a,
                  cgpaDetails.b,
                  cgpaDetails.c,
                  cgpaDetails.d,
                  cgpaDetails.e,
                  cgpaDetails.f,
                  cgpaDetails.n,
                ].map((v, i, arr) => (
                  <td
                    key={i}
                    className={`px-3 py-3 text-blue-200 border-t border-blue-200 
                ${
                  i === 2
                    ? "text-left whitespace-normal"
                    : "text-center whitespace-nowrap"
                } 
                ${i < arr.length - 1 ? "border-r border-blue-200" : ""}`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </GradientCard>

      <br />
      <h2
        className="text-blue-500"
        style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}
      >
        Grade History
      </h2>
      {/* Gradient ring wrapper */}
      <div className="relative w-full">
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
        <div className="table-card relative rounded-2xl overflow-hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              padding: 3,
              background: "linear-gradient(90deg,#3b82f6,#22d3ee,#a855f7)",
              opacity: 0.7,
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              borderRadius: 20,
              overflow: "hidden",
            }}
          />
          <div
            className="rounded-2xl"
            style={{
              position: "relative",
              zIndex: 1,
              background:
                "linear-gradient(180deg, rgba(15,17,22,0.92), rgba(12,14,18,0.92))",
              boxShadow:
                "0 0 0 1px rgba(120,200,255,0.18) inset, 0 8px 28px rgba(0,0,0,0.45)",
            }}
          >
            {loading ? (
              <div style={{ padding: 24 }}>Loading…</div>
            ) : err ? (
              <div style={{ padding: 24, color: "#fca5a5" }}>{err}</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      {[
                        "S. No",
                        "College Course Code",
                        "Course Name",
                        "Grade",
                        "Credits",
                        "Exam Month",
                      ].map((h, i, arr) => (
                        <th
                          key={h}
                          className={`md:text-center text-center text-blue-300 font-bold sticky top-0 py-3.5 px-3 
    bg-gray-800 backdrop-blur-sm 
    border-b border-blue-200 
    ${i === 2 ? "text-left" : "text-center"} 
    ${i < arr.length - 1 ? "border-r border-blue-200" : ""}`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, idx) => (
                      <tr key={idx}>
                        {[
                          r.sno,
                          r.code,
                          r.name,
                          r.grade,
                          r.credits,
                          r.examMonth,
                        ].map((v, i, arr) => (
                          <td
                            key={i}
                            className={`px-3 py-3 text-blue-200 border-t-1 border-blue-200 ${
                              i === 2
                                ? "text-left whitespace-normal"
                                : "text-center whitespace-nowrap"
                            } 
    ${i < arr.length - 1 ? "border-r-1 border-blue-200" : ""}`}
                          >
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <h2
        className="text-blue-500"
        style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}
      >
        Curriculum Details
      </h2>
      <GradientCard>
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full border-separate border-spacing-0 text-white">
            <thead>
              <tr>
                {[
                  "Curriculum Distribution Type",
                  "Credits Required",
                  "Credits Earned",
                ].map((h, i, arr) => (
                  <th
                    key={h}
                    className={`text-blue-400 font-bold sticky top-0 py-3.5 px-3 
                bg-gray-800 backdrop-blur-sm 
                border-b border-blue-200 
                ${i === 0 ? "text-left" : "text-center"} 
                ${i < arr.length - 1 ? "border-r border-blue-200" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {curriculumDetails.map((row, idx) => {
                const isLast = idx === curriculumDetails.length - 1; // ✅ check last row
                const cells = [row.type, row.required, row.earned];
                return (
                  <tr
                    key={idx}
                    className={isLast ? "font-bold text-blue-300" : ""}
                  >
                    {cells.map((v, i, arr) => (
                      <td
                        key={i}
                        className={`px-3 py-3 border-t border-blue-200 
                    ${isLast ? "text-blue-300 font-bold" : "text-blue-200"} 
                    ${
                      i === 0
                        ? "text-left whitespace-normal"
                        : "text-center whitespace-nowrap"
                    } 
                    ${i < arr.length - 1 ? "border-r border-blue-200" : ""}`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GradientCard>
    </section>
  );
}
