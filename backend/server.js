const express = require("express");
const cors = require("cors");
const { LeetCode } = require("leetcode-query");

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(cors({
  origin: "https://sushengrover.onrender.com" // frontend URL
}));

app.use(express.json());

app.get("/", (_req, res) => res.send("Portfolio Backend is Running 🚀"));

app.get("/leetcode/:username", async (req, res) => {
  const { username } = req.params;
  const leetcode = new LeetCode();

  try {
    const user = await leetcode.user(username);

    if (!user || user.errors) {
      return res.status(404).json({
        error: "User not found",
        detail: user.errors || "Please check the username.",
      });
    }

    const stats = {
      name: user.realName || user.username,
      username: user.username,
      avatar: user.profile?.userAvatar || "https://assets.leetcode.com/users/leetcode/avatar_1568224780.png",
      ranking: user.profile?.ranking > 0 ? user.profile.ranking : "N/A",
      country: user.profile?.countryName || "N/A",
      allSolved: user.matchedUser?.submitStats?.acSubmissionNum?.[0]?.count || 0,
      easySolved: user.matchedUser?.submitStats?.acSubmissionNum?.[1]?.count || 0,
      medSolved: user.matchedUser?.submitStats?.acSubmissionNum?.[2]?.count || 0,
      hardSolved: user.matchedUser?.submitStats?.acSubmissionNum?.[3]?.count || 0,
      easyTotal: user.allQuestionsCount?.[1]?.count || 0,
      medTotal: user.allQuestionsCount?.[2]?.count || 0,
      hardTotal: user.allQuestionsCount?.[3]?.count || 0,
      acceptance: user.profile?.reputation || 0,
    };

    const submissions = await leetcode.recent_submissions(username, 10);

    const recent = submissions.map((s) => ({
      id: s.id,
      title: s.title,
      titleSlug: s.titleSlug,
      timestamp: s.timestamp,
    }));

    const badges = user.matchedUser?.badges?.map(badge => ({
      id: badge.id,
      name: badge.displayName,
      icon: badge.icon,
      creationDate: badge.creationDate,
    })) || [];

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
