import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { CryptoCurrency } from './types'
import { getCryptos } from './services/CryptoService'

type CriptoStore = {
    cryptocurrencies: CryptoCurrency[]
    fetchCryptos: () => Promise<void>
}

// Zustand store that keeps the current cryptocurrency list and exposes a method to refresh it.
export const useCryptoStore = create<CriptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    fetchCryptos: async () => {
      // Request the latest cryptocurrencies from the API service.
      const cryptocurrencies = await getCryptos()
      // Update the global store with the newest data.
      set(() => ({
        cryptocurrencies
      }))
    }
  }))
)