import { render, screen } from '@testing-library/react'
import CryptoPriceDisplay from '../CryptoPriceDisplay'
import { useCryptoStore } from '../../store'

// Mock Zustand store selectors so tests can control loading and result state.
vi.mock('../../store', () => ({
  useCryptoStore: vi.fn()
}))

// Test suite for the CryptoPriceDisplay component.
describe('CryptoPriceDisplay', () => {
  it('renders the spinner while the quote is loading', () => {
    // Mock the store to return a loading state with an empty result.
    ;(useCryptoStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: any) =>
      selector({
        loading: true,
        result: {
          IMAGEURL: '',
          PRICE: '',
          HIGHDAY: '',
          LOWDAY: '',
          CHANGEPCT24HOUR: '',
          LASTUPDATE: ''
        }
      })
    )

    const { container } = render(<CryptoPriceDisplay />)

    // Spinner should show while loading, and the quote heading should not be rendered.
    expect(container.querySelector('.sk-chase')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /quote/i })).not.toBeInTheDocument()
  })

  it('renders the quote details when a result exists', () => {
    // Mock the store to return a completed quote result.
    ;(useCryptoStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: any) =>
      selector({
        loading: false,
        result: {
          IMAGEURL: 'media/37746251/btc.png',
          PRICE: '$100,000',
          HIGHDAY: '$101,000',
          LOWDAY: '$99,000',
          CHANGEPCT24HOUR: '2.50',
          LASTUPDATE: 'Just now'
        }
      })
    )

    render(<CryptoPriceDisplay />)

    expect(screen.getByRole('heading', { name: /quote/i })).toBeInTheDocument()
    expect(screen.getByText('$100,000')).toBeInTheDocument()
    expect(screen.getByText('$101,000')).toBeInTheDocument()
    expect(screen.getByText('$99,000')).toBeInTheDocument()
    expect(screen.getByText('2.50%')).toBeInTheDocument()
    expect(screen.getByText('Just now')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /cryptocurrency image/i })).toHaveAttribute(
      'src',
      'https://www.cryptocompare.com/media/37746251/btc.png'
    )
  })
})
