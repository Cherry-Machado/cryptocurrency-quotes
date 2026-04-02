
import { useMemo } from "react"
import { useCryptoStore } from "../store"


export default function CryptoPriceDisplay() {
  const result = useCryptoStore((state) => state.result)
  const hasResult = useMemo(() => Object.keys(result).length > 0 && !Object.values(result).includes(''), [result])      

  return (
    <div>
        {hasResult && (
            <>
                <h2>Quote</h2>
                <div className="result">

                    <div>
                        <p>The price is: <span>{result.PRICE}</span></p>
                    </div>

                    <div>
                        <p>The high is: <span>{result.HIGHDAY}</span></p>
                    </div>
                </div>
            </>
        )}
       
    </div>
  )
}
