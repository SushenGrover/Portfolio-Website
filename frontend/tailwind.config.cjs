/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#60a5fa", // light blue
          DEFAULT: "#2563eb", // medium blue
          dark: "#1e3a8a", // dark blue
        },
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-blue-600",
    "bg-green-600",
    "bg-pink-600",
    "bg-yellow-600",
    "bg-purple-600",
    "bg-cyan-600",
    "text-blue-400",
    "text-green-400",
    "text-pink-400",
    "text-yellow-400",
    "text-purple-400",
    "text-cyan-400",
    "hover:bg-blue-500",
    "hover:bg-green-500",
    "hover:bg-pink-500",
    "hover:bg-yellow-500",
    "hover:bg-purple-500",
    "hover:bg-cyan-500",
    "hover:text-white",
    // If you use arbitrary value utilities for shadow, also add:
    "shadow-[0_0_12px_4px_rgba(59,130,246,0.7)]",
    "hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.6)]",
  ],
};
