module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'text-red-400',
    'text-orange-400',
    'text-yellow-300',
    'text-green-400',
    'text-cyan-300',
    'text-blue-400',
    'text-purple-400',
    'text-pink-400'
  ],
  theme: {
    extend: {
      fontFamily: {
        terminal: ['"JetBrains Mono"', 'monospace']
      }
    }
  }
}
