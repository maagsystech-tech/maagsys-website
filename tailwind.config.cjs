function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: withOpacity('--brand-rgb'),
          dark: withOpacity('--brand-dark-rgb'),
          deep: withOpacity('--brand-deep-rgb'),
          tint: withOpacity('--brand-tint-rgb'),
          50: withOpacity('--brand-tint-rgb'),
          100: withOpacity('--brand-tint-rgb'),
          200: withOpacity('--brand-tint-rgb'),
          300: withOpacity('--brand-rgb'),
          400: withOpacity('--brand-rgb'),
          500: withOpacity('--brand-rgb'),
          600: withOpacity('--brand-rgb'),
          700: withOpacity('--brand-dark-rgb'),
          800: withOpacity('--brand-dark-rgb'),
          900: withOpacity('--brand-deep-rgb'),
        },
        accent: {
          DEFAULT: withOpacity('--brand-rgb'),
          50: withOpacity('--brand-tint-rgb'),
          100: withOpacity('--brand-tint-rgb'),
          200: withOpacity('--brand-tint-rgb'),
          300: withOpacity('--brand-rgb'),
          400: withOpacity('--brand-rgb'),
          500: withOpacity('--brand-rgb'),
          600: withOpacity('--brand-rgb'),
          700: withOpacity('--brand-dark-rgb'),
        },
        surface: {
          50: '#FAFBFC',
          100: '#F4F6F8',
          200: '#E9ECF0',
          300: '#D1D5DB',
        }
      },
      fontFamily: {
        sans: ['Raleway', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Raleway', 'sans-serif'],
        heading: ['Raleway', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      animation: {
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'count-up': 'countUp 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      },
      backgroundSize: {
        '200%': '200% 100%',
      },
    },
  },
  plugins: [],
};
