import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ErrorState {
    isNetworkError: boolean,
    isUnexpectedError: boolean
}

const initialState: ErrorState = {
    isNetworkError: false,
    isUnexpectedError: false
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setIsNetworkError: (state, action: PayloadAction<boolean>) => {
            state.isNetworkError = action.payload
        },
        setIsUnexpectedError: (state, action: PayloadAction<boolean>) => {
            state.isUnexpectedError = action.payload
        }
    }
})

export const { setIsNetworkError, setIsUnexpectedError } = errorSlice.actions

export default errorSlice.reducer