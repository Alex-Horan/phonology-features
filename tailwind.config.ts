import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'surface0': '#414559',
        'surface2': '#51586d',
        'catpink':'#f4b8e4',
        'catsky':'#99d1db',
        'overlay0': '#737994',
        'crust': '#232634',
        'mantle': '#1e2030',
      },
      spacing: {
        '90vh': '90vh',
        '80p': '80%',
        '60p': '80vw',
        '50t': '50vh',
        '40px': '40px',
      },
    },
  },
  plugins: [],
};
export default config;
