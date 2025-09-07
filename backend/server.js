const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { LeetCode } = require("leetcode-query");

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(
  cors({
    // origin: "http://localhost:5173", // local testing URL
    origin: "https://sushengrover.onrender.com", // render frontend URL
  })
);

app.use(express.json());

const LEETCODE_API_ENDPOINT = "https://leetcode-stats-api.herokuapp.com/";

app.get("/", (_req, res) => res.send("Portfolio Backend is Running 🚀"));

app.get("/leetcode/:username", async (req, res) => {
  const { username } = req.params;
  const leetcode = new LeetCode();

  try {
    // Fetch from both sources concurrently
    const [statsResponse, userResponse] = await Promise.all([
      fetch(`${LEETCODE_API_ENDPOINT}${username}`),
      leetcode.user(username),
    ]);

    // Safely parse the response from the stats API
    const statsData = statsResponse.ok
      ? await statsResponse.json()
      : { status: "error" };

    if (!userResponse || userResponse.errors) {
      return res.status(404).json({
        error: "User not found via leetcode-query",
        detail: userResponse.errors || "Please check the username.",
      });
    }

    // --- Process Badges and Recents (from leetcode-query) ---
    const submissions = await leetcode.recent_submissions(username, 20);
    const recent = submissions.map((s) => ({
      id: s.id,
      title: s.title,
      titleSlug: s.titleSlug,
      timestamp: s.timestamp,
    }));
    const badges = (userResponse.matchedUser?.badges || []).map((badge) => ({
      id: badge.id,
      name: badge.displayName,
      icon: badge.icon.startsWith("/")
        ? `https://leetcode.com${badge.icon}`
        : badge.icon,
      creationDate: badge.creationDate,
    }));

    // --- MERGE DATA WITH FALLBACKS for maximum reliability ---
    const acSubs = userResponse.matchedUser?.submitStats?.acSubmissionNum?.[0];
    const stats = {
      // Prioritize leetcode-query for names, fallback to the username from the request
      name: userResponse.realName || userResponse.username || username,
      username: userResponse.username || username,
      avatar:
        userResponse.profile?.userAvatar ||
        "https://assets.leetcode.com/users/leetcode/avatar_1568224780.png",

      // Prioritize the accurate stats API, but fallback to leetcode-query if needed
      totalSubmissions: statsData.totalSubmissions || acSubs?.submissions || 0,
      acceptanceRate:
        statsData.acceptanceRate?.toFixed(1) ||
        (acSubs?.submissions > 0
          ? ((acSubs.count / acSubs.submissions) * 100).toFixed(1)
          : "0.0"),

      // These stats are reliable from leetcode-query
      allSolved: acSubs?.count || 0,
      easySolved:
        userResponse.matchedUser?.submitStats?.acSubmissionNum?.[1]?.count || 0,
      medSolved:
        userResponse.matchedUser?.submitStats?.acSubmissionNum?.[2]?.count || 0,
      hardSolved:
        userResponse.matchedUser?.submitStats?.acSubmissionNum?.[3]?.count || 0,
      easyTotal: userResponse.allQuestionsCount?.[1]?.count || 0,
      medTotal: userResponse.allQuestionsCount?.[2]?.count || 0,
      hardTotal: userResponse.allQuestionsCount?.[3]?.count || 0,
    };

    res.json({ stats, recent, badges });
  } catch (err) {
    console.error("LeetCode proxy error:", err?.message || err);
    res.status(502).json({
      error: "LeetCode upstream failed",
      detail: err?.message || String(err),
    });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
});
