import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'list_header': '#381010',
        'list_header_hover': '#4C1616',

        'list': '#FFF9F3',
        'icon': '#F9F9F9',

      },
      
    },
    plugins: [typography, forms, aspectRatio],
  
  },
};
