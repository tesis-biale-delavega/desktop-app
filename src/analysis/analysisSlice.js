import { createSlice } from "@reduxjs/toolkit";
import {indexes} from "../utils/indexes";

const initialState = {
  folderPath: "",
  stitchingData: undefined,
  projectPath: "",
  generatedIndexes: [],
  indexesData: indexes,
  processState: undefined
};

export const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    setFolderPath: (state, action) => {
      state.folderPath = action.payload;
    },
    setStitchingData: (state, action) => {
      state.stitchingData = action.payload;
    },
    setProjectPath: (state, action) => {
      state.projectPath = action.payload;
    },
    setGeneratedIndexes: (state, action) => {
      state.generatedIndexes = action.payload;
    },
    setIndexesData: (state, action) => {
      state.indexesData = action.payload;
    },
    setProcessState: (state, action) => {
      state.processState = action.payload;
    },
  },
});

export const {
  setFolderPath,
  setStitchingData,
  setProjectPath,
  setGeneratedIndexes,
  setIndexesData,
  setProcessState
} = analysisSlice.actions;

export default analysisSlice.reducer;
