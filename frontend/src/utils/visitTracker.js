import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  increment,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

// Fetch visitor IP address
async function getVisitorIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json", {
      signal: AbortSignal.timeout(5000),
    });
    const data = await response.json();
    return data.ip || "unknown";
  } catch (error) {
    console.warn(error);
    return "unknown";
  }
}

export async function trackVisit() {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const timestamp = new Date().toISOString();

  try {
    const ip = await getVisitorIP();

    // Create document ID as "date_ip" for easy lookup (e.g., "2026-08-11_223.187.121.222")
    const docId = `${today}_${ip}`;
    const ipRef = doc(db, "visitor_ips", docId);

    // Increment or create the visit count for this IP on this date
    await setDoc(
      ipRef,
      {
        date: today,
        ip,
        visitCount: increment(1),
        lastSeen: timestamp,
      },
      { merge: true },
    );

    // Also increment daily count for quick stats
    const dailyRef = doc(db, "visits_daily", today);
    await setDoc(dailyRef, { count: increment(1) }, { merge: true });

    // console.log(`✅ Visit tracked: ${today} | IP: ${ip}`);
  } catch (error) {
    // console.error("❌ Visit tracking failed:", error);
  }
}

export async function getVisitCount() {
  const today = new Date().toISOString().split("T")[0];
  const dailyRef = doc(db, "visits_daily", today);

  try {
    const docSnap = await getDoc(dailyRef);
    return docSnap.exists() ? docSnap.data().count : 0;
  } catch (error) {
    // console.error("❌ Failed to get visit count:", error);
    
    return 0;
  }
}
