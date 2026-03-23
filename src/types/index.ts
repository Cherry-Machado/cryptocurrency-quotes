import { z } from "zod";
import { CurrencySchema } from "../schema/crypto-schema";

// A TypeScript type that represents a currency, which is inferred from the CurrencySchema defined in the crypto-schema file. 
// This type includes a code and a name, both of which are strings.
export type Currency = z.infer<typeof CurrencySchema>;