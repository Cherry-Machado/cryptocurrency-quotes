import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { CryptoCurrency, CryptoPrice, Pair } from './types'
import { getCryptos, fetchCurrentCryptoPrice } from './services/CryptoService'

type CriptoStore = {
    cryptocurrencies: CryptoCurrency[]
    result: CryptoPrice
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

// Zustand store that keeps the current cryptocurrency list and exposes a method to refresh it.
export const useCryptoStore = create<CriptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {
      IMAGEURL: '',
      PRICE: '',
      HIGHDAY: '',
      LOWDAY: '',
      CHANGEPCT24HOUR: '',
      LASTUPDATE: ''
    },
    fetchCryptos: async () => {
      // Request the latest cryptocurrencies from the API service.
      const cryptocurrencies = await getCryptos()
      // Update the global store with the newest data.
      set(() => ({
        cryptocurrencies
      }))
    },
    fetchData: async (pair) => {
      const result = await fetchCurrentCryptoPrice(pair)
      set(() => ({
        result
      }))
    }
  }))
)