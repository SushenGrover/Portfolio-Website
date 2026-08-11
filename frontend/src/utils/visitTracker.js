import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc, increment } from "firebase/firestore";

export async function trackVisit() {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const visitRef = doc(db, "visits", today);

  try {
    // Increment visit count for today
    await setDoc(visitRef, { count: increment(1) }, { merge: true });
    console.log("✅ Visit tracked for", today);
  } catch (error) {
    console.error("❌ Visit tracking failed:", error);
  }
}

export async function getVisitCount() {
  const today = new Date().toISOString().split("T")[0];
  const visitRef = doc(db, "visits", today);

  try {
    const docSnap = await getDoc(visitRef);
    return docSnap.exists() ? docSnap.data().count : 0;
  } catch (error) {
    console.error("❌ Failed to get visit count:", error);
    return 0;
  }
}
