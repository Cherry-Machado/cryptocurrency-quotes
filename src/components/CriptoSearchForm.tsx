import { currencies } from "../data";

// A form component for searching cryptocurrency quotes based on selected currency and cryptocurrency.
export default function CriptoSearchForm() {
  return (
    <form className="form">
        <div className="field">
            <label htmlFor="currency">Currency</label>
            <select 
                id="currency" 
                name="currency" 
            >
                <option value="">-- Choose a Currency --</option>
                {/* Dynamically populate the currency options from the imported currencies data */}
                {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>{currency.name}</option>
                ))}
            </select>
      </div>
               
      <div className="field">
            <label htmlFor="criptocurrency">Cryptocurrency</label>
            <select 
                id="criptocurrency" 
                name="criptocurrency" 
            >
                <option value="">-- Choose a Cryptocurrency --</option>
            </select>
      </div>

      <input type="submit" value="Quote Search" />
    </form>
  )
}
