import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        wine: "#c23a2e",
        wineMasOscuro: "#4c0033",
        gin: "#64bad6",
        licor: "#d1cc39",
        beige: "#EEE4B1",
        grey1: "#D8D6D7",
        grey2: "#C0BEBF",
        grey3: "#908F8F",
        grey4: "#605F60",
        grey5: "#484748"
      },
      fontFamily: {
        'Lato': ['Lato', 'sans-serif'],
        'Marcellus': ['Marcellus SC', 'sans-serif'],
        'Alegreya': ['Alegreya Sans SC', 'sans-serif'],
        'Lora': ['Lora', 'sans-serif']
      },
      spacing: {
        'small': '1rem',
        'medium': '3.5rem',
        'large': '7.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
