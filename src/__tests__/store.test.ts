import { useCryptoStore } from '../store'
import * as service from '../services/CryptoService'

// Test suite for the global crypto store.
// This file verifies that the store correctly updates state when the
// fetchCryptos action is called.
describe('Crypto Store', () => {

  it('fetchCryptos updates state', async () => {
    // Prepare mocked data matching the expected API response shape.
    const mockData = [
      { CoinInfo: { Name: 'BTC', FullName: 'Bitcoin' } }
    ]

    // Replace the real API call with a mock returning the test data.
    vi.spyOn(service, 'getCryptos').mockResolvedValue(mockData as any)

    // Access the fetchCryptos action directly from the store.
    const { fetchCryptos } = useCryptoStore.getState()

    // Execute the action to update the store.
    await fetchCryptos()

    // Read the updated store state and verify the change.
    const state = useCryptoStore.getState()

    expect(state.cryptocurrencies).toEqual(mockData)
  })

})
