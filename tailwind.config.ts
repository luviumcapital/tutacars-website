import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { red: "#C41E3A", "red-dark": "#8B0000", black: "#0A0A0A", card: "#141414", border: "#2A2A2A", muted: "#6B7280" }
      },
      fontFamily: { serif: ["Georgia", "Times New Roman", "serif"], sans: ["Inter", "Arial", "system-ui", "sans-serif"] }
    }
  },
  plugins: []
};
export default config;
