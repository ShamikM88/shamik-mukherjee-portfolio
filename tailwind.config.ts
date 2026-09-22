import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Distinct teal/emerald accent — deliberately not Tailwind's default
        // indigo/violet, so this doesn't read as a generic AI-template palette.
        brand: {
          50: "#effcf6",
          100: "#c9f7e4",
          200: "#94efc9",
          300: "#5fe0ac",
          400: "#2fc98f",
          500: "#149c72", // primary accent
          600: "#0d7d5c",
          700: "#0a634a",
          800: "#094f3d",
          900: "#083f32",
          950: "#04241c",
        },
        // Warm secondary accent, used sparingly for highlights/CTAs
        ember: {
          400: "#f4a340",
          500: "#e6832a",
          600: "#c8661c",
        },
        // Cool secondary accent — used for the "Lightweight Delivery" mode on the
        // Approach page, distinct from ember's other unrelated uses elsewhere.
        blue: {
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
        },
        // Fourth qualitative accent — added for the wallet-provisioning case study once
        // ember/brand/blue were all already claimed by the other three case studies.
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        ink: {
          50: "#f6f7f8",
          100: "#eceef0",
          200: "#d3d8dd",
          300: "#a9b3bc",
          400: "#788592",
          500: "#586572",
          600: "#454f5b",
          700: "#38414b",
          800: "#252b32",
          900: "#14181d",
          950: "#0a0d10",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)",
        "card-hover": "0 8px 24px -4px rgb(0 0 0 / 0.12), 0 2px 8px -2px rgb(0 0 0 / 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
