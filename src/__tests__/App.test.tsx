import { render, screen } from '@testing-library/react'
import App from '../App'
import { useCryptoStore } from '../store'

// Mock the store to control its behavior during tests and avoid real API calls.
vi.mock('../store', () => ({
  useCryptoStore: vi.fn()
}))

// Test suite for the main App component.
describe('App', () => {
  // Verify the application renders the main heading correctly.
  it('renders title', () => {
    // Mock the store selector to return the required state and a no-op fetch function.
    (useCryptoStore as any).mockImplementation((selector: any) =>
      selector({
        cryptocurrencies: [],
        fetchCryptos: vi.fn()
      })
    )

    render(<App />)

    // Ensure the heading text is present in the rendered output.
    expect(screen.getByRole('heading', { name: /cryptocurrency/i })).toBeInTheDocument()
  })

})
