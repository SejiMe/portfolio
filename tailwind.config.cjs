// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/** @type {import('tailwindcss').Config} */

/* eslint-disable */
const { fontFamily } = require("tailwindcss/defaultTheme");
/* eslint-enable */

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                mono: ["Overpass Mono", fontFamily.mono],
                primary: ["Overpass", fontFamily.sans],
                content: ["Nunito", fontFamily.sans],
            },
            colors: {
                // #region  ------- blue color --------
                blue: {
                    50: "rgb(var(--tw-color-blue-50) / <alpha-value>)",
                    100: "rgb(var(--tw-color-blue-100) / <alpha-value>)",
                    200: "rgb(var(--tw-color-blue-200) / <alpha-value>)",
                    300: "rgb(var(--tw-color-blue-300) / <alpha-value>)",
                    400: "rgb(var(--tw-color-blue-400) / <alpha-value>)",
                    500: "rgb(var(--tw-color-blue-500) / <alpha-value>)",
                    600: "rgb(var(--tw-color-blue-600) / <alpha-value>)",
                    700: "rgb(var(--tw-color-blue-700) / <alpha-value>)",
                    800: "rgb(var(--tw-color-blue-800) / <alpha-value>)",
                    900: "rgb(var(--tw-color-blue-900) / <alpha-value>)",
                },
                // #endregion
                // #region -------- beige color -----
                beige: {
                    50: "rgb(var(--tw-color-beige-50) / <alpha-value>)",
                    100: "rgb(var(--tw-color-beige-100) / <alpha-value>)",
                    200: "rgb(var(--tw-color-beige-200) / <alpha-value>)",
                    300: "rgb(var(--tw-color-beige-300) / <alpha-value>)",
                    400: "rgb(var(--tw-color-beige-400) / <alpha-value>)",
                    500: "rgb(var(--tw-color-beige-500) / <alpha-value>)",
                    600: "rgb(var(--tw-color-beige-600) / <alpha-value>)",
                    700: "rgb(var(--tw-color-beige-700) / <alpha-value>)",
                    800: "rgb(var(--tw-color-beige-800) / <alpha-value>)",
                    900: "rgb(var(--tw-color-beige-900) / <alpha-value>)",
                },
                // #endregion
            },
            animation: {
                wiggle: "wiggle 0.3s ease-in-out 3",
            },
            keyframes: {
                wiggle: {
                    "0%, 100%": { transform: "rotate(-1.5deg)" },
                    "50%": { transform: "rotate(1deg)" },
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        /* eslint-disable */
        require("tailwind-typewriter")({
            wordsets: {
                seji: {
                    words: [
                        "<Seji />",
                        "<Developer />",
                        `<Seji TODO/>`,
                    ],
                    delay: 0,
                },
            },
        }),
        require("tailwindcss-animated"),
    ],
};
