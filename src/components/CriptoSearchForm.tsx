import { useCryptoStore } from "../store"
import { currencies } from "../data";
import { useState, type ChangeEvent } from "react";
import type { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

// CriptoSearchForm renders the quote search form for choosing a fiat currency
// and a cryptocurrency. It reads available crypto data from the global store
// and uses a local static list for fiat currency options.
export default function CriptoSearchForm() {

  // Pull the current cryptocurrency list from Zustand state.
  const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)

  const fetchData = useCryptoStore((state) => state.fetchData)

  const [pair, setPair] = useState<Pair>({
    currency: '',
    criptocurrency: ''
  })

  const [error, setError] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPair({ ...pair, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(Object.values(pair).includes('')) {
      setError('All fields are required')
      return
    }
    setError('')
    // Consult the API with the selected currency and cryptocurrency pair to fetch the quote data. 
    fetchData(pair)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* Currency selector section */}
      <div className="field">
        <label htmlFor="currency">Currency</label>
        <select 
          id="currency" 
          name="currency"
          onChange={handleChange}
          value={pair.currency}
        >
          <option value="">-- Choose a Currency --</option>
          {/* Render static currency options from the local data file. */}
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cryptocurrency selector section */}
      <div className="field">
        <label htmlFor="criptocurrency">Cryptocurrency</label>
        <select 
          id="criptocurrency" 
          name="criptocurrency"
          onChange={handleChange}
          value={pair.criptocurrency}
        >
          <option value="">-- Choose a Cryptocurrency --</option>
          {/* Render cryptocurrency options fetched from the API via Zustand. */}
          {cryptocurrencies.map((crypto) => (
            <option key={crypto.CoinInfo.FullName} value={crypto.CoinInfo.Name}>
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" value="Quote Search" />
    </form>
  )
}
