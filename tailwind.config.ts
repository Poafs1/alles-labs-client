import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      body: ["Inter", "sans-serif"],
      header: ["Inter", "sans-serif"],
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      sm: { raw: "(min-width: 640px)" },
      md: { raw: "(min-width: 768px)" },
      lg: { raw: "(min-width: 1024px)" },
      xl: { raw: "(min-width: 1280px)" },

      // smd: { raw: "(min-device-width: 640px)" },
      // mdd: { raw: "(min-device-width: 768px)" },
      // lgd: { raw: "(min-device-width: 1024px)" },
      // xld: { raw: "(min-device-width: 1280px)" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
