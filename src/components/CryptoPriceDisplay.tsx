
import { useMemo } from "react"
import { useCryptoStore } from "../store"
import Spinner from "./Spinner"


export default function CryptoPriceDisplay() {
  const result = useCryptoStore((state) => state.result)
  const loading = useCryptoStore((state) => state.loading)
  const hasResult = useMemo(() => Object.keys(result).length > 0 && !Object.values(result).includes(''), [result])      

  return (
    <div className = "result-wrapper">
        {loading ? <Spinner /> : hasResult && (
            <>
                <h2>Quote</h2>
                <div className="result">
                    <img src={`https://www.cryptocompare.com/${result.IMAGEURL}`} 
                        alt="cryptocurrency Image" 
                    />
                    <div>
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
