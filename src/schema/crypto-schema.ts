import { z } from "zod";

// Zod schema for validating a currency object from the local currency list.
export const CurrencySchema = z.object({
  code: z.string(),
  name: z.string()
});

// Zod schema for validating a single cryptocurrency item returned by the API.
export const CryptoCurrencyResponseSchema = z.object({
  CoinInfo: z.object({
    Name: z.string(),
    FullName: z.string()
  })
})

// Array schema for the collection of validated cryptocurrency items.
export const CryptoCurrenciesResponseSchema = z.array(CryptoCurrencyResponseSchema)

export const PairSchema = z.object({
  currency: z.string(),
  criptocurrency: z.string()
})