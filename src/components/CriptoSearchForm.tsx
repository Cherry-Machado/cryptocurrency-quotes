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
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
            </select>
      </div>

      <div className="field">
            <label htmlFor="criptocurrency">Cryptocurrency</label>
            <select 
                id="criptocurrency" 
                name="criptocurrency" 
            >
                <option value="">-- Choose a Cryptocurrency --</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="BNB">Binance Coin (BNB)</option>
            </select>
      </div>

      <input type="submit" value="Quote Search" />
    </form>
  )
}
