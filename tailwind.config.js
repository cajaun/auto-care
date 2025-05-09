/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        accent: "#FF4040",
        dark: {
          5: "#E8E9EA",
          40: "#A3A6AC",
          50: "#767982",
          80: "#313644",
          90: "#1A202F",
        },
        secondary: {
          100: "#F2F2F2",
          200: "#DDDDDD",
          300: "#B8B8B8",
          400: "#878787",
        },
        tertiary: {
          100: "#F5F5F5"
        }
      }
    },
  },
  plugins: [],
}

