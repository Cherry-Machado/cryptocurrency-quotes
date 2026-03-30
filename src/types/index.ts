import { z } from "zod";
import { CurrencySchema, CryptoCurrencyResponseSchema } from "../schema/crypto-schema";

// Type inferred from the currency schema used for local currency list values.
export type Currency = z.infer<typeof CurrencySchema>

// Type inferred from the cryptocurrency schema used for API response items.
export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponseSchema>;