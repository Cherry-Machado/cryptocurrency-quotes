import axios from 'axios'
import { fetchCurrentCryptoPrice, getCryptos } from '../CryptoService'

// Mock axios so service tests do not make real network requests.
vi.mock('axios')

describe('CryptoService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns parsed cryptocurrencies on success', async () => {
    // Mock a valid cryptocurrency list response.
    ;(axios as any).mockResolvedValue({
      data: {
        Data: [
          {
            CoinInfo: {
              Name: 'BTC',
              FullName: 'Bitcoin'
            }
          }
        ]
      }
    })

    const result = await getCryptos()

    expect(result).toHaveLength(1)
    expect(result[0].CoinInfo.Name).toBe('BTC')
  })

  it('returns an empty array when the cryptocurrency payload is invalid', async () => {
    // Mock a malformed cryptocurrency payload to verify validation fallback.
    ;(axios as any).mockResolvedValue({
      data: {
        Data: [{ invalid: true }]
      }
    })

    const result = await getCryptos()

    expect(result).toEqual([])
  })

  it('returns an empty array when the cryptocurrency request fails', async () => {
    // Mock a network failure and verify the service returns an empty array.
    ;(axios as any).mockRejectedValue(new Error('API error'))

    const result = await getCryptos()

    expect(result).toEqual([])
  })

  it('returns the parsed quote for a selected pair', async () => {
    // Mock a successful quote response for a currency pair.
    ;(axios as any).mockResolvedValue({
      data: {
        DISPLAY: {
          BTC: {
            USD: {
              IMAGEURL: '/media/37746251/btc.png',
              PRICE: '$100,000',
              HIGHDAY: '$101,000',
              LOWDAY: '$99,000',
              CHANGEPCT24HOUR: '2.50',
              LASTUPDATE: 'Just now'
            }
          }
        }
      }
    })

    const result = await fetchCurrentCryptoPrice({
      currency: 'USD',
      criptocurrency: 'BTC'
    })

    expect(result).toEqual({
      IMAGEURL: '/media/37746251/btc.png',
      PRICE: '$100,000',
      HIGHDAY: '$101,000',
      LOWDAY: '$99,000',
      CHANGEPCT24HOUR: '2.50',
      LASTUPDATE: 'Just now'
    })
  })

  it('returns undefined when the quote payload is invalid', async () => {
    // Mock an incomplete quote payload and verify undefined is returned.
    ;(axios as any).mockResolvedValue({
      data: {
        DISPLAY: {
          BTC: {
            USD: {
              PRICE: '$100,000'
            }
          }
        }
      }
    })

    const result = await fetchCurrentCryptoPrice({
      currency: 'USD',
      criptocurrency: 'BTC'
    })

    expect(result).toBeUndefined()
  })
})
