import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('toggles between dark and light mode', async () => {
    const fetchCryptos = vi.fn().mockResolvedValue(undefined)
    const user = userEvent.setup()

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

    const switchButton = screen.getByRole('switch', { name: /switch to dark mode/i })

    expect(document.body).toHaveAttribute('data-theme', 'light')
    expect(switchButton).toHaveAttribute('aria-checked', 'true')

    await user.click(switchButton)

    expect(document.body).toHaveAttribute('data-theme', 'dark')
    expect(screen.getByRole('switch', { name: /switch to light mode/i })).toHaveAttribute('aria-checked', 'false')
  })
})
