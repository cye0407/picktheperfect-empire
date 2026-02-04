// tailwind.config.cjs
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main palette - strawberry themed
        'strawberry': '#DC143C',
        'strawberry-red': '#DC143C',
        'strawberry-pink': '#FF6B8A',
        'strawberry-light': '#FFE4E8',
        'leaf-green': '#228B22',
        'garden': '#22C55E',
        'cream': '#FFFAF0',
        
        // For tomato component compatibility
        'tomato': '#DC143C',
        'periwinkle': '#FFE4E8',
        
        // Type colors
        'june-bearing': '#E53E3E',
        'day-neutral': '#38A169',
        'everbearing': '#D69E2E',
        'alpine': '#805AD5',
        
        // Neutrals
        'ink': '#2A2A2A',
      },
    },
  },
  plugins: [],
}
