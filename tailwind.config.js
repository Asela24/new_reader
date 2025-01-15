/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        '50/73': ' 50 / 73'
      }
    },
    keyframes: {
      bounce: {
        '0%, 80%, 100%': { transform: 'scale(0)' },
        '40%': { transform: 'scale(1)' },
      },
    },
    animation: {
      bounce: 'bounce 1.4s infinite',
    },
  },
  plugins: [],
};
