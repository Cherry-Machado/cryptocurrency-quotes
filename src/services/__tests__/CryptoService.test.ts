import axios from 'axios'
import { getCryptos } from '../CryptoService'

vi.mock('axios')

describe('getCryptos', () => {

  it('returns parsed data on success', async () => {
    const mockResponse = {
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
    }

    ;(axios as any).mockResolvedValue(mockResponse)

    const result = await getCryptos()

    expect(result.length).toBe(1)
    expect(result[0].CoinInfo.Name).toBe('BTC')
  })

  it('returns empty array on error', async () => {
    ;(axios as any).mockRejectedValue(new Error('API error'))

    const result = await getCryptos()

    expect(result).toEqual([])
  })

})
