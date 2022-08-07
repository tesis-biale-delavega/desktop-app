import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    folderPath: "",
    projectPath: "",
    generatedIndexes: []
}

export const analysisSlice = createSlice({
    name: 'analysis',
    initialState,
    reducers: {
        setFolderPath: (state, action) => {
            state.folderPath = action.payload
        },
        setProjectPath: (state, action) => {
            state.projectPath = action.payload
        },
        setGeneratedIndexes: (state, action) => {
            state.generatedIndexes = action.payload
        },
    },
})

export const { setFolderPath, setProjectPath, setGeneratedIndexes } = analysisSlice.actions

export default analysisSlice.reducer