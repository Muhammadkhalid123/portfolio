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
        aura: {
          bg: "#FFFFFF",
          primary: "#171717",
          border: "#E6E6E6",
          light: "#D4D4D4",
          muted: "#737373",
        },
        charcoal: "#211E1C",
        chalk: "#F9F8F6",
        smoke: "#E0E0E0",
        ink: "#2A281F",
        slate: "#718698",
        mint: "#A1FFCB",
        butter: {
          surface: "#EDEDED", // color-5
          dark: "#0F0F0F", // color-1 Text Primary
          muted: "#808080", // color-2 Text Secondary
          accent: "#00FFD0", // color-3 Accent
          light: "#EBEBEB", // color-4 Text Light
          canvas: "#FAFAFA", // color-6 Canvas Light
        },
        accent: {
          DEFAULT: "#00FFD0",
          hover: "#33FFDA",
          muted: "rgba(0, 255, 208, 0.15)",
          glow: "rgba(0, 255, 208, 0.35)",
        },
        obsidian: {
          DEFAULT: "#0F0F0F",
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#808080",
          500: "#5d5d5d",
          600: "#3d3d3d",
          700: "#262626",
          800: "#181818",
          900: "#121212",
          950: "#0F0F0F",
        },
        primary: {
          DEFAULT: "#00FFD0",
          foreground: "#0F0F0F",
          dark: "#0F0F0F",
        },
        dev: {
          bg: "#FAFAFA",
          card: "#0F0F0F",
          border: "rgba(0, 255, 208, 0.25)",
          accent: "#00FFD0",
          glow: "rgba(0, 255, 208, 0.2)",
        },
        ai: {
          bg: "#FAFAFA",
          card: "#0F0F0F",
          border: "rgba(0, 255, 208, 0.25)",
          accent: "#00FFD0",
          glow: "rgba(0, 255, 208, 0.2)",
        },
        personal: {
          bg: "#FAFAFA",
          card: "#0F0F0F",
          border: "rgba(0, 255, 208, 0.25)",
          accent: "#00FFD0",
          glow: "rgba(0, 255, 208, 0.2)",
        },
      },
      fontSize: {
        "xs": ["10px", { lineHeight: "16.25px" }],
        "sm": ["13px", { lineHeight: "20px" }],
        "base": ["16px", { lineHeight: "24px" }],
        "lg": ["18px", { lineHeight: "27px" }],
        "xl": ["20px", { lineHeight: "31.59px" }],
        "2xl": ["36px", { lineHeight: "34.2942px" }],
        "3xl": ["40px", { lineHeight: "38.7912px" }],
      },
      spacing: {
        "space-1": "8px",
        "space-2": "10px",
        "space-3": "11px",
        "space-4": "12px",
        "space-5": "14px",
        "space-6": "15px",
        "space-7": "16px",
        "space-8": "17px",
        "space-9": "21px",
        "space-10": "22px",
        "space-11": "24px",
        "space-12": "25px",
        "space-13": "27px",
        "space-14": "29px",
        "space-15": "40px",
        "space-16": "50px",
        "space-17": "51px",
        "space-18": "131px",
        "space-19": "140px",
      },
      borderRadius: {
        "aura": "12px",
        "radius-sm": "12px",
        "scoop": "0px 0px 60px 60px",
        "butter-md": "5px",
        "butter-lg": "8px",
        "butter-xl": "10px",
        "butter-pill": "16px",
        "butter-6": "32px",
      },
      boxShadow: {
        "aura": "rgba(0, 0, 0, 0.05) 0px 1px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 4px 0px, rgba(0, 0, 0, 0.15) 0px 10px 10px 0px, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
        "aura-sm": "rgba(0, 0, 0, 0.05) 0px 1px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 4px 0px, rgba(0, 0, 0, 0.15) 0px 10px 10px 0px, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
      },
      transitionTimingFunction: {
        "aura": "cubic-bezier(0.4, 0, 0.2, 1)",
        "butter-fast": "cubic-bezier(0.835, 0.12, 0.225, 0.77)",
        "butter-smooth": "cubic-bezier(0.2, 0.715, 0.205, 0.99)",
        "butter-decel": "cubic-bezier(0, 0, 0, 1)",
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Times New Roman", "Times", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "editor-grid": "linear-gradient(to right, rgba(15, 15, 15, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 15, 15, 0.05) 1px, transparent 1px)",
        "editor-grid-dark": "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        "dots-pattern": "radial-gradient(circle, rgba(0, 255, 208, 0.15) 1px, transparent 1px)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-cyan": "glow-cyan 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-cyan": {
          "0%": { opacity: "0.3", filter: "blur(20px)" },
          "100%": { opacity: "0.7", filter: "blur(32px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
