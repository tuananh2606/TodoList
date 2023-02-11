/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                'fit-40': 'repeat(auto-fit, minmax(300px,_1fr)',
            },
        },
    },
    plugins: [],
};
