import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef6ff",
          100: "#d9ebff",
          500: "#1e66f5",
          600: "#0f4fd6",
          700: "#0a3da5",
        },
        secondary: {
          500: "#16a34a",
          600: "#15803d",
        },
        surface: "#f8fbff",
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        soft: "0 10px 40px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #1e66f5 0%, #18b97a 100%)",
        "hero-radial": "radial-gradient(circle at 20% 20%, rgba(30,102,245,0.24), transparent 40%), radial-gradient(circle at 80% 0%, rgba(24,185,122,0.2), transparent 35%)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;