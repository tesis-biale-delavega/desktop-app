import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    folderPath: "",
    projectPath: ""
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
    },
})

// Action creators are generated for each case reducer function
export const { setFolderPath, setProjectPath } = analysisSlice.actions

export default analysisSlice.reducer