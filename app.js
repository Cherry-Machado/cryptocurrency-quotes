// Prototype fetch to verify CoinDesk API connectivity
async function fetchBitcoinPrice() {
    const url = 'https://developers.coindesk.com/';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log("Connection Successful!");
        console.log("Current Price (USD):", data.bpi.USD.rate);
        return data;
    } catch (error) {
        console.error("API Connection Failed:", error);
    }
}

// Execute the prototype
fetchBitcoinPrice();