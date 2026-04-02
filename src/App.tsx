import { useEffect } from "react"
import CriptoSearchForm from "./components/CriptoSearchForm"
import { useCryptoStore } from "./store"
import CryptoPriceDisplay from "./components/CryptoPriceDisplay"

// The main application component that renders the cryptocurrency quote search form and the overall layout of the app.
function App() {

  const fetchCryptos = useCryptoStore((state) => state.fetchCryptos)

  // Load the cryptocurrency list once when the app first mounts.
  useEffect(() => {
    fetchCryptos()
  }, [])

  return (
    <>
      <div className="container">
        <h1 className="app-title">
          <span>Cryptocurrency</span> Quotes
        </h1>

        <div className="content">
          <CriptoSearchForm />
          <CryptoPriceDisplay />
        </div>
      </div>
      
    </>
  )
}

export default App
