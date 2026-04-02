import axios from 'axios'
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from '../schema/crypto-schema'
import type { Pair } from '../types'

// Fetch the top 20 cryptocurrencies by market cap in USD and validate the returned data.
// This service exists as the single API abstraction layer for loading cryptocurrency metadata.
export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'

    // Use axios to fetch the raw API payload.
    try {
        const { data: { Data }} = await axios(url)
        // Validate the `Data` array against the Zod schema before exposing it to the app.
        const result = CryptoCurrenciesResponseSchema.safeParse(Data)

        if (result.success) {
            // Validated data is safe to return and render.
            console.log(result.data)
            return result.data
        } else {
            // Log validation details to make debugging schema mismatches easier.
            console.error("Zod validation failed for cryptocurrencies:", result.error);
            return [] // Use an empty array fallback to keep the app stable.
        }
    } catch (error) {
        // Log low-level network or request errors separately from validation failures.
        console.error("Error fetching cryptocurrencies from API:", error);
        return [] // Return an empty array if the fetch fails.
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
    // Method to fetch quote data based on selected pair.
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`
    try {
        const { data: {DISPLAY} } = await axios(url)
        const result = CryptoPriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency])

        if (result.success) {
            return result.data
        } else {
            console.error("Zod validation failed for current crypto price data:", result.error);
        }
    } catch (error) {
        console.error("Error fetching current crypto price data:", error);
    }
}