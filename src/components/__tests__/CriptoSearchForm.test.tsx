import { render, screen } from '@testing-library/react'
import CriptoSearchForm from '../CriptoSearchForm'
import { useCryptoStore } from '../../store'
import userEvent from '@testing-library/user-event'
/* Mock the store to control its behavior during tests */
vi.mock('../../store', () => ({
  useCryptoStore: vi.fn()
}))
/* Test suite for the CriptoSearchForm component, which allows users to select a currency and a cryptocurrency. */
describe('CriptoSearchForm', () => {
  beforeEach(() => {
    (useCryptoStore as any).mockImplementation((selector: any) => 
      selector({
        cryptocurrencies: [
          { CoinInfo: { Name: 'BTC', FullName: 'Bitcoin' } },
          { CoinInfo: { Name: 'ETH', FullName: 'Ethereum' } }
        ]
      })
    )
  })
/* Test to verify that the form fields for selecting currency and cryptocurrency are rendered correctly. */
  it('renders form fields', () => {
    render(<CriptoSearchForm />)
    expect(screen.getByLabelText('Currency')).toBeInTheDocument()
    expect(screen.getByLabelText('Cryptocurrency')).toBeInTheDocument()
  })
  /* Test to verify that users can select options from the currency and cryptocurrency dropdowns, and that the selected values are updated accordingly. */
  it('allows selecting currency and crypto', async () => {
    render(<CriptoSearchForm />)
    const user = userEvent.setup()
    /* Get the select elements for currency and cryptocurrency using their labels, then simulate user interactions to select options and verify that the selected values are updated correctly. */
    const currencySelect = screen.getByLabelText('Currency')
    const cryptoSelect = screen.getByLabelText('Cryptocurrency')
    /* Simulate user selecting 'USD' from the currency dropdown and 'BTC' from the cryptocurrency dropdown, then assert that the select elements have the expected values after the selections. */
    await user.selectOptions(currencySelect, 'USD')
    await user.selectOptions(cryptoSelect, 'BTC')
    /* Assert that the currency select has the value 'USD' and the cryptocurrency select has the value 'BTC', confirming that the selections were made successfully. */
    expect(currencySelect).toHaveValue('USD')
    expect(cryptoSelect).toHaveValue('BTC')
  })
})
