import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-main min-h-screen pb-8 max-w-screen overflow-x-hidden">
      <div className="bg-texture bg-cover bg-opacity-75 min-h-screen">
        <Component {...pageProps} />
      </div>
    </div>
  )  
}
