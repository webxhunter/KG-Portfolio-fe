/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/**/*.{js,ts,jsx,tsx,mdx}', // Add this if you use src directory
    ],
    theme: {
      extend: {
        spacing: {
          '15': '3.75rem',    // 60px for Instagram icons
          '25': '6.25rem',    // 100px for pattern heights
          '55': '13.75rem',   // 220px for image heights
          '105': '26.25rem',  // 420px for min-height
        },
        borderRadius: {
          '5': '1.25rem',     // 20px border radius
          '10': '2.5rem',     // 40px border radius
        },
        scale: {
          '102': '1.02',      // Slight scale for hover effects
        },
        height: {
          '4.5': '1.125rem',  // 18px for specific spacing
        },
        margin: {
          '4.5': '1.125rem',  // 18px margin
        },
        padding: {
          '2.5': '0.625rem',  // 10px padding
        },
        animation: {
          'glitch': 'glitchEffect 0.3s ease-in-out both 5',
        },
        keyframes: {
          glitchEffect: {
            '0%': { transform: 'translate(0, 0)' },
            '20%': { transform: 'translate(-2px, 2px)' },
            '40%': { transform: 'translate(-2px, -2px)' },
            '60%': { transform: 'translate(2px, 2px)' },
            '80%': { transform: 'translate(2px, -2px)' },
            '100%': { transform: 'translate(0, 0)' }
          }
        }
      }
    },
    plugins: [
      function({ addUtilities }) {
        const newUtilities = {
          '.glitch-text': {
            position: 'relative',
            display: 'inline-block',
          },
          '.glitch-text::before, .glitch-text::after': {
            content: 'attr(data-glitch)',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            opacity: '0.8',
            pointerEvents: 'none',
          },
          '.glitch-text::before': {
            color: '#00ffff',
            zIndex: '-1',
          },
          '.glitch-text::after': {
            color: '#ff00ff', 
            zIndex: '-2',
          },
          '.glitch-text:hover::before': {
            animation: 'glitchEffect 0.3s ease-in-out both 5',
          },
          '.glitch-text:hover::after': {
            animation: 'glitchEffect 0.3s ease-in-out reverse both 5',
          }
        }
        addUtilities(newUtilities)
      }
    ]
  }