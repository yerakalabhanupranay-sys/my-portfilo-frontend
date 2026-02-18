/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f5f7ff',
                    100: '#ebf0fe',
                    200: '#ced9fd',
                    300: '#adc0fb',
                    400: '#6d8ef7',
                    500: '#2d5cf3',
                    600: '#2953db',
                    700: '#2245b6',
                    800: '#1b3792',
                    900: '#162d77',
                },
                dark: {
                    DEFAULT: '#0f172a',
                    lighter: '#1e293b',
                    light: '#334155',
                }
            },
            boxShadow: {
                glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'card-hover': '0 20px 50px rgba(79, 70, 229, 0.15)',
                'card-hover-dark': '0 20px 50px rgba(0, 0, 0, 0.3)',
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            animation: {
                'gradient-x': 'gradient-x 15s ease infinite',
                'fade-in': 'fade-in 0.5s ease-out',
                'slide-up': 'slide-up 0.5s ease-out',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            }
        },
    },
    plugins: [],
}
