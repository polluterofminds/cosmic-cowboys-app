/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"PP NeueBit"', 'sans-serif']
    }, 
    extend: {      
      colors: {
        "main": "#77421B", 
        "primary": "#FF5C02", 
        "light": "#F39A77", 
        "textPrimary": "#FFBF9B", 
        "chatBackgroundPrimary": "#F57C25", 
        "chatBackgroundSecondary": "#F29A77", 
        "input": "#e1e1e1", 
        "btnPrimary": "#121212", 
        "cardBackground": "#7A4824", 
        "mainBrown": "#61391c", 
        "credits":"#FFAE19"
      }, 
      backgroundImage: {
        'main-pattern': "url('/MainBackground.svg')", 
        'intro-welcome': "url('/IntroWelcome.svg')", 
        'intro-body': "url('/IntroBody.svg')", 
        'texture': "url('/Texture.png')", 
        'chat-body': "url('/ChatBody.svg')", 
        'small-card': "url('/SmallCard.png')", 
      }, 
      borderRadius: {
        "cardCorners": "7rem"
      }
    },
  },
  plugins: [],
}

