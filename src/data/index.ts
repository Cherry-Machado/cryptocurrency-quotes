import { type Currency } from "../types";

// A static list of supported fiat currencies used by the quote search form.
// These values are rendered in the currency select dropdown.
export const currencies: Currency[] = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound Sterling' },
  { code: 'MXN', name: 'Mexican Peso' },
  { code: 'BRL', name: 'Brazilian Real' }
]