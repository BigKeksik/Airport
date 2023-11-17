import { useQuery } from "./useQuery"

export const useApiRequest = () => {
    const {sendRequest, isLoading} = useQuery()
    const defaultUrl = 'https://airports-by-api-ninjas.p.rapidapi.com/v1'

    const GET_ALL_AIRPORT = async () => {
        return await sendRequest(`${defaultUrl}/airports?country=US`)
    }

    const GET_AIRPORT_BY_NAME = async (name: string) => {
        return await sendRequest(`${defaultUrl}/airports?name=${name}&country=US`)
    }
    
    const GET_AIRPORT_BY_CODE = async (code: string) => {
        if (code.length > 2) {
            return await sendRequest(`${defaultUrl}/airports?iata=${code}&country=US`)
        }
    }

    return {
        GET_ALL_AIRPORT,
        GET_AIRPORT_BY_NAME,
        GET_AIRPORT_BY_CODE,
        isLoading
    }
}