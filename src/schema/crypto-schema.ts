import { z } from "zod";

// A Zod schema for validating currency objects, which consist of a code and a name.
export const CurrencySchema = z.object({
  code: z.string(),
  name: z.string()
});

export const CryptoCurrencyResponseSchema = z.object({
  CoinInfo: z.object({
    Name: z.string(),
    FullName: z.string()
  })
})

// Take that schema above and conver it to an array.
export const CryptoCurrenciesResponseSchema = z.array(CryptoCurrencyResponseSchema)