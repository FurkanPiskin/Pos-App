/** @type {import('tailwindcss').Config} */
export const content = [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  extend: {
    gridTemplateColumns:{
      "card":"repeat(auto-fill,minmax(150px,1fr))",
       statistic_card: "repeat(auto-fill, minmax(250px, 1fr))"
    }
  },
};
export const plugins = [];
