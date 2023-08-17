module.exports = {
  theme: {
    screens: {
      'xsm': '378px',
      'sm': '570px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1836px',
    },
    extend: {
      colors: { themeBackground: 'var(--background)', themeText: 'var(--text)', },
    },
  },
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  plugins: [],
  exposeConfig: false,
  injectPosition: 0,
  viewer: false,
}

