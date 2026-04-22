// tailwind.config.cjs
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main palette
        'periwinkle': '#6B8DD6',
        'tomato': '#E23B2E',
        'garden': '#22C55E',
        'sunny': '#FFD93D',
        'wildcard': '#A91B60',
        
        // Panel backgrounds
        'tomato-soft': '#FFE8E6',
        
        // Neutrals
        'ink': '#2A2A2A',
      },
    },
  },
  plugins: [],
}
