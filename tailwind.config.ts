import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        dev: {
          bg: "#090d16",
          card: "#0f172a",
          border: "#1e293b",
          cyan: "#06b6d4",
          blue: "#3b82f6",
          emerald: "#10b981",
          slate: "#64748b",
          glow: "rgba(6, 182, 212, 0.15)",
        },
        ai: {
          bg: "#0c0a17",
          card: "#17122b",
          border: "#2e214d",
          purple: "#a855f7",
          fuchsia: "#d946ef",
          violet: "#8b5cf6",
          pink: "#ec4899",
          glow: "rgba(168, 85, 247, 0.18)",
        },
        personal: {
          bg: "#090a0f",
          card: "#12141d",
          border: "#232736",
          amber: "#f59e0b",
          indigo: "#6366f1",
          blue: "#0ea5e9",
          glow: "rgba(99, 102, 241, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        "dots-pattern": "radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.4", filter: "blur(20px)" },
          "100%": { opacity: "0.8", filter: "blur(30px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
