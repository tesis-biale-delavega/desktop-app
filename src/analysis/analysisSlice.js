import { createSlice } from "@reduxjs/toolkit";
import {indexes} from "../utils/indexes";
import {processingStates} from "../utils/processingStates";

const initialState = {
  folderPath: "",
  stitchingData: undefined,
  projectPath: "",
  generatedIndexes: [],
  indexesData: indexes,
  processingState: processingStates.INDEX_VISUALIZATION_HEATMAP
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
    setProcessingState: (state, action) => {
      state.processingState = action.payload;
    },
  },
});

export const {
  setFolderPath,
  setStitchingData,
  setProjectPath,
  setGeneratedIndexes,
  setIndexesData,
  setProcessingState
} = analysisSlice.actions;

export default analysisSlice.reducer;
