// tailwind.config.js
module.exports = {
    // other configurations
    theme: {
      extend: {
        keyframes: {
          slideIn: {
            '0%': { transform: 'translateX(100%)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
          slideOut: {
            '0%': { transform: 'translateX(0)', opacity: '1' },
            '100%': { transform: 'translateX(-100%)', opacity: '0' },
          },
        },
        animation: {
          slideIn: 'slideIn 0.5s forwards',
          slideOut: 'slideOut 0.5s forwards',
        },
      },
    },
    plugins: [],
  }
  