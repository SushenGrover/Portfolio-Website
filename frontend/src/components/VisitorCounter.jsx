import React, { useEffect, useState } from "react";
import { getVisitCount } from "../utils/visitTracker";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      const visitCount = await getVisitCount();
      setCount(visitCount);
      setLoading(false);
    };
    fetchCount();
  }, []);

  if (loading) return null; // Don't show until loaded

  return (
    <div
      style={{
        padding: "12px 16px",
        borderRadius: "8px",
        background: "rgba(0, 200, 255, 0.1)",
        border: "1px solid rgba(120, 200, 255, 0.25)",
        textAlign: "center",
        fontSize: "14px",
        color: "#88ddff",
        marginTop: "20px",
        display: "inline-block",
      }}
    >
      👥 Visitors today: <strong>{count}</strong>
    </div>
  );
}
