
import { useMemo } from "react"
import { useCryptoStore } from "../store"
import Spinner from "./Spinner"

// CryptoPriceDisplay shows the cryptocurrency quote result when available.
// It displays loading state, quote details, and handles conditional rendering.
export default function CryptoPriceDisplay() {
  // Extract the quote result and loading state from the global store.
  const result = useCryptoStore((state) => state.result)
  const loading = useCryptoStore((state) => state.loading)

  // Memoize whether a valid result exists to avoid unnecessary recalculations.
  const hasResult = useMemo(() => Object.keys(result).length > 0 && !Object.values(result).includes(''), [result])

  return (
    <div className="result-wrapper">
      {/* Show spinner during loading, otherwise show result if available. */}
      {loading ? <Spinner /> : hasResult && (
        <>
          <h2>Quote</h2>
          <div className="result">
            {/* Display the cryptocurrency image from CryptoCompare. */}
            <img src={`https://www.cryptocompare.com/${result.IMAGEURL}`}
              alt="cryptocurrency Image"
            />
            <div>
              {/* Render various price and market data points. */}
              <p>The price is: <span>{result.PRICE}</span></p>
              <p>The highest price in the day: <span>{result.HIGHDAY}</span></p>
              <p>The lowest price in the day: <span>{result.LOWDAY}</span></p>
              <p>Variation in the last 24 hours: <span>{result.CHANGEPCT24HOUR}%</span></p>
              <p>Last update: <span>{result.LASTUPDATE}</span></p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
