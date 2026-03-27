import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { CryptoCurrency } from './types'
import { getCryptos } from './services/CryptoService'

type CriptoStore = {
    cryptocurrencies: CryptoCurrency[]
    fetchCryptos: () => Promise<void>
}

export const useCryptoStore = create<CriptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({ 
            cryptocurrencies 
        }))
    }
})))