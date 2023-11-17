import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface FindState {
    findValue: string,
    someoneFind: boolean
}

const initialState: FindState = {
    findValue: '',
    someoneFind: true
}

export const findSlice = createSlice({
    name: 'find',
    initialState,
    reducers: {
        changeFind: (state, action: PayloadAction<string>) => {
            state.findValue = action.payload
        },
        setTrueSomeoneFind: (state) => {
            state.someoneFind = true
        },
        setFalseSomeoneFind: (state) => {
            state.someoneFind = false
        }
    }
})

export const { changeFind, setTrueSomeoneFind, setFalseSomeoneFind } = findSlice.actions
export default findSlice.reducer