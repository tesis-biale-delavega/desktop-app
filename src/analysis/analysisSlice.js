import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    folderPath: "",
}

export const analysisSlice = createSlice({
    name: 'analysis',
    initialState,
    reducers: {
        setFolderPath: (state, action) => {
            state.folderPath = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setFolderPath } = analysisSlice.actions

export default analysisSlice.reducer