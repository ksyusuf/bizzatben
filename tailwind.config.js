/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Programming mode colors - Yeşil, mavi, mor, pembe tonları
        'prog-primary': '#10B981',      // Yeşil
        'prog-secondary': '#059669',     // Koyu yeşil
        'prog-accent': '#8B5CF6',       // Mor
        'prog-dark': '#1F2937',          // Koyu gri
        'prog-darker': '#0F0F0F',        // Çok koyu gri
        'prog-light': '#6B7280',         // Orta gri
        'prog-blue': '#3B82F6',          // Mavi
        'prog-pink': '#EC4899',          // Pembe
        'prog-purple': '#8B5CF6',        // Mor
        
        // Civil mode colors - Sarı tonları
        'civil-primary': '#D97706',      // Koyu sarı
        'civil-secondary': '#F59E0B',    // Orta sarı
        'civil-accent': '#FEF3C7',       // Açık sarı
        'civil-dark': '#4B5563',         // Koyu gri
        'civil-darker': '#0F0F0F',       // Çok koyu gri
        'civil-light': '#9CA3AF',        // Orta gri
        'civil-gold': '#F59E0B',         // Altın sarısı
        'civil-amber': '#F59E0B',        // Amber
        'civil-yellow': '#FEF3C7',       // Açık sarı
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'wave-rotate': 'waveRotate 20s linear infinite',
        'wave-float': 'waveFloat 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        waveRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        waveFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 