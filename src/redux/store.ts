import { configureStore } from "@reduxjs/toolkit";
import findReducer from "./slice/findSlice";
import errorReducer from "./slice/errorSlice";

export const store = configureStore({
    reducer: {
        find: findReducer,
        error: errorReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch