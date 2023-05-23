/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				fadeIntoView: "fadeIn 0.5s ease-in-out",
			},

			keyframes: () => ({
				fadeIn: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
			}),
		},
	},
	plugins: [],
};
