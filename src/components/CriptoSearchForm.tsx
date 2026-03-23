import { currencies } from "../data";

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
