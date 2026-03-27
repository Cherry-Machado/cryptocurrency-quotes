import axios from 'axios'
import { CryptoCurrenciesResponseSchema } from '../schema/crypto-schema'

export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    try {
        const { data: { Data }} = await axios(url)
        const result = CryptoCurrenciesResponseSchema.safeParse(Data)
        if (result.success) {
             console.log(result.data)
            return result.data
           
        } else {
            //Record the Zod error to understand why the validation failed
            console.error("Zod validation failed for cryptocurrencies:", result.error);
            return [] // Return an empty array or handle the error as appropriate
        }
    } catch (error) {
        // Log any errors in the API call
        console.error("Error fetching cryptocurrencies from API:", error);
        return [] // Returns an empty array as fallback
    }
}