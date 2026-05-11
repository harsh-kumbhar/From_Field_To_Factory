/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#22c55e",
                secondary: "#84cc16",
                dark: "#020617",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            boxShadow: {
                glow: "0 0 25px rgba(34,197,94,0.35)",
            },
        },
    },
    plugins: [],
};