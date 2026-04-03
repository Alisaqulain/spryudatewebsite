import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        primary: {
          // Grassier, brighter green
          DEFAULT: "#63C253",
          foreground: "#0f172a",
          muted: "#4FB744",
        },
        secondary: {
          DEFAULT: "#2F2F2F",
          foreground: "#fafafa",
        },
        surface: {
          DEFAULT: "#f8faf8",
          card: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(47, 47, 47, 0.08)",
        glow: "0 0 0 1px rgba(109, 190, 69, 0.15), 0 20px 50px -20px rgba(109, 190, 69, 0.35)",
        "glow-sm": "0 0 0 1px rgba(109, 190, 69, 0.12), 0 8px 30px -8px rgba(109, 190, 69, 0.25)",
      },
      backgroundImage: {
        "mesh-hero":
          "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(109, 190, 69, 0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(109, 190, 69, 0.1), transparent 50%), linear-gradient(180deg, #fafbfa 0%, #ffffff 45%, #f4f7f4 100%)",
        "card-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,248,0.95) 100%)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
