import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'
import { useCryptoStore } from '../store'

// Mock the global store to avoid real state and API interactions during tests.
vi.mock('../store', () => ({
  useCryptoStore: vi.fn()
}))

describe('App', () => {
  it('renders the title and fetches cryptocurrencies on mount', async () => {
    const fetchCryptos = vi.fn().mockResolvedValue(undefined)

    // Mock the store selector values expected by the App component.
    ;(useCryptoStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: any) =>
      selector({
        cryptocurrencies: [],
        result: {
          IMAGEURL: '',
          PRICE: '',
          HIGHDAY: '',
          LOWDAY: '',
          CHANGEPCT24HOUR: '',
          LASTUPDATE: ''
        },
        loading: false,
        fetchCryptos,
        fetchData: vi.fn()
      })
    )

    render(<App />)

    // The main app heading should render and the fetch action should be invoked once.
    expect(screen.getByRole('heading', { name: /cryptocurrency quotes/i })).toBeInTheDocument()
    await waitFor(() => expect(fetchCryptos).toHaveBeenCalledTimes(1))
  })
})
