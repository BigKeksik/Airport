import axios from "axios"
import axiosRetry from 'axios-retry'
import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { setIsNetworkError, setIsUnexpectedError } from "../redux/slice/errorSlice"

export const useQuery = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const defaultHeader = {
		'X-RapidAPI-Key': '4b3d50217bmsh5fd912f66f1e90fp112a84jsnd0835779ceda',
		'X-RapidAPI-Host': 'airports-by-api-ninjas.p.rapidapi.com'
	}

    const sendRequest = useCallback(async (url: string, method = 'GET', headers = defaultHeader) => {
        setIsLoading(true)

        try {
            axiosRetry(axios, {
                retries: 100,
                retryDelay: () => {
                    dispatch(setIsNetworkError(true))
                    dispatch(setIsUnexpectedError(false))
                    console.log('retry connection')
                    
                    return 3000
                }
            })

            const response = await axios({
                url,
                method,
                headers,
            })

            dispatch(setIsNetworkError(false))
            dispatch(setIsUnexpectedError(false))
            
            const result = response.data

            setIsLoading(false)
            return result
        } catch(error) {
            if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
                dispatch(setIsNetworkError(true))
                dispatch(setIsUnexpectedError(false))
                return
            }    

            dispatch(setIsNetworkError(false))
            dispatch(setIsUnexpectedError(true))        

            return
        }
    }, [])

    return {isLoading, sendRequest}
}