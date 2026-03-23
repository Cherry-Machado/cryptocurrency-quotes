import { z } from "zod";

// A Zod schema for validating currency objects, which consist of a code and a name.
export const CurrencySchema = z.object({
  code: z.string(),
  name: z.string()
});