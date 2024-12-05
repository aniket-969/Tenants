/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "#040404",
        foreground: "#ffffff",

        card: {
          DEFAULT: "#de8c9d",
          foreground: "#fe2858",
        },
        popover: {
          DEFAULT: "#040404", // Hex value for popover background
          foreground: "#de8c9d", // Hex value for popover text
        },
        primary: {
          DEFAULT: "#fe2858", // Hex value for primary color
          foreground: "#ffffff", // Hex value for primary foreground
        },
        secondary: {
          DEFAULT: "#2af0ea", // Hex value for secondary color
          foreground: "#040404", // Hex value for secondary foreground
        },
        muted: {
          DEFAULT: "#397684", // Hex value for muted background
          foreground: "#de8c9d", // Hex value for muted foreground
        },
        accent: {
          DEFAULT: "#2af0ea", // Hex value for accent color
          foreground: "#040404", // Hex value for accent foreground
        },
        destructive: {
          DEFAULT: "#fe2858", // Hex value for destructive color
          foreground: "#040404", // Hex value for destructive foreground
        },
        border: "#040404", // Hex value for border
        input: "#fe2858", // Hex value for input
        ring: "#fe2858", // Hex value for ring
        chart: {
          1: "#fe2858", // Hex value for chart 1
          2: "#2af0ea", // Hex value for chart 2
          3: "#397684", // Hex value for chart 3
          4: "#fe2858", // Hex value for chart 4
          5: "#040404", // Hex value for chart 5
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
