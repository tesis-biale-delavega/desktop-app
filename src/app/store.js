import { configureStore } from '@reduxjs/toolkit'
import analysisReducer from "../analysis/analysisSlice";

export const store = configureStore({
    reducer: {
        analysis: analysisReducer
    },
})