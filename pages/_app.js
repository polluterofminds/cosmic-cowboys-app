import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-main min-h-screen">
      <div className="bg-texture bg-cover bg-opacity-75 min-h-screen">
        <Component {...pageProps} />
      </div>
    </div>
  )  
}
