import { type Currency } from "../types";

// A static list of currencies that can be used in the cryptocurrency quote search form.
export const currencies : Currency[] = [
  { code: 'USD', name: 'United States Dollar'},
  { code: 'EUR', name: 'Euro'},
  { code: 'GBP', name: 'British Pound Sterling'},
  { code: 'MXN', name: 'Mexican Peso'},
  { code: 'BRL', name: 'Brazilian Real'}
]