// src/assets/DesignData.js

const rawDesignData = [
  {
    id: 2,
    title: "Instagram Post (VITFAM)",
    date: "2024-10-02", // Example date
    paths: [
      "/design/vitfam_insta_post1.png",
      "/design/vitfam_insta_post2.png",
      "/design/vitfam_insta_post3.png",
    ],
  },
  {
    id: 1,
    title: "Diwali Poster (PlaceXP)",
    date: "2024-10-31",
    paths: ["/design/diwali_placexp.png"],
  },
  {
    id: 3,
    title: "Gandhi Jayanti Poster (Nexseed)",
    date: "2024-10-02",
    paths: ["/design/gandhi_jayanti_nexseed.png"],
  },
  {
    id: 4,
    title: "Ganesh Chaturthi Poster (Nexseed)",
    date: "2024-09-07",
    paths: ["design/ganesh_chaturthi_nexseed.mp4"],
  },
  {
    id: 6,
    title: "Janmashtami Poster (Nexseed)",
    date: "2024-08-26",
    paths: ["design/janmashtami_nexseed.mp4"],
  },
  {
    id: 11,
    title: "Independace Day Poster (Nexseed)",
    date: "2023-08-15",
    paths: ["design/indipendence_day_nexseed.mp4"],
  },
  {
    id: 5,
    title: "IBM Event (PlaceXP)",
    date: "2025-01-18",
    paths: ["design/ibm_poster_placexp.png"],
  },
  {
    id: 9,
    title: "Voyage Countdown (Nexseed)",
    date: "2024-06-15",
    paths: ["design/voyage_countdown.png"],
  },
  {
    id: 8,
    title: "Linkedin Cover",
    date: "2024-01-10",
    paths: ["design/linkedin_cover.png"],
  },
  {
    id: 7,
    title: "Lifelines Wall Poster",
    date: "2024-07-05",
    paths: ["design/lifelines.png"],
  },
  {
    id: 10,
    title: "Workplace Poster",
    date: "2023-10-01",
    paths: ["design/workplace_poster.png"],
  },
];

// This sorts the data automatically: Newest Date first, Oldest last
export const designData = rawDesignData.sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);
