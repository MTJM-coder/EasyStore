import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors:{
                primary:"rgb(var(--primary)/<alpha-value>)",
                "primary-dark":"rgb(var(--primary-dark)/<alpha-value>)",
                "primary-darker":"rgb(var(--primary-darker)/<alpha-value>)",
                secondary:"rgb(var(--secondary)/<alpha-value>)",
                accent:"rgb(var(--accent)/<alpha-value>)",
                succes:"rgb(var(--succes)/<alpha-value>)",
                "text-dark":"rgb(var(--text-dark)/<alpha-value>)",
                "text-medium":"rgb(var(--text-medium)/<alpha-value>)",
                "text-light":"rgb(var(--text-light)/<alpha-value>)"

            },
            keyframes:{
                float:{
                    '0%,100%':{transform:'translateY(0)'},
                    '50%':{transform:'translate(-40px)'}
                },
            },
                animation:{
                    
                        float:'float 3s ease-in-out infinite '
            }
        },
    },

    plugins: [forms],
};
