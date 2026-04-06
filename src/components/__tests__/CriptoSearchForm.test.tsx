import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CriptoSearchForm from '../CriptoSearchForm'
import { useCryptoStore } from '../../store'

// Mock Zustand store for form rendering and submission tests.
vi.mock('../../store', () => ({
  useCryptoStore: vi.fn()
}))

describe('CriptoSearchForm', () => {
  const fetchData = vi.fn()

  beforeEach(() => {
    fetchData.mockReset()

    ;(useCryptoStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: any) =>
      selector({
        cryptocurrencies: [
          { CoinInfo: { Name: 'BTC', FullName: 'Bitcoin' } },
          { CoinInfo: { Name: 'ETH', FullName: 'Ethereum' } }
        ],
        fetchData
      })
    )
  })

  it('renders both select fields', () => {
    render(<CriptoSearchForm />)

    // Ensure the currency and cryptocurrency dropdowns are rendered.
    expect(screen.getByLabelText('Currency')).toBeInTheDocument()
    expect(screen.getByLabelText('Cryptocurrency')).toBeInTheDocument()
  })

  it('shows a validation message when the form is submitted without both selections', async () => {
    const user = userEvent.setup()

    render(<CriptoSearchForm />)

    // Submit the form with default empty values and expect validation feedback.
    await user.click(screen.getByRole('button', { name: /quote search/i }))

    expect(screen.getByText('All fields are required')).toBeInTheDocument()
    expect(fetchData).not.toHaveBeenCalled()
  })

  it('submits the selected currency pair', async () => {
    const user = userEvent.setup()

    render(<CriptoSearchForm />)

    await user.selectOptions(screen.getByLabelText('Currency'), 'USD')
    await user.selectOptions(screen.getByLabelText('Cryptocurrency'), 'BTC')
    await user.click(screen.getByRole('button', { name: /quote search/i }))

    // Verify fetchData was called with the chosen currency pair.
    expect(fetchData).toHaveBeenCalledWith({
      currency: 'USD',
      criptocurrency: 'BTC'
    })
    expect(screen.queryByText('All fields are required')).not.toBeInTheDocument()
  })
})
