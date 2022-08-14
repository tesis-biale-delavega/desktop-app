import { createSlice } from "@reduxjs/toolkit";
import {indexes} from "../utils/indexes";
import {processingStates} from "../utils/processingStates";

const initialState = {
  folderPath: "",
  stitchingData: undefined,
  projectPath: "",
  generatedIndexes: [],
  indexesData: indexes,
  processingState: processingStates.INDEX_VISUALIZATION_HEATMAP,
  availableImageLayers: [],
  compareLayersSlider: undefined
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
    setAvailableImageLayers: (state, action) => {
      state.availableImageLayers = action.payload;
    },
    setCompareLayersSlider: (state, action) => {
      state.compareLayersSlider = action.payload;
    },
  },
});

export const {
  setFolderPath,
  setStitchingData,
  setProjectPath,
  setGeneratedIndexes,
  setIndexesData,
  setProcessingState,
  setAvailableImageLayers,
  setCompareLayersSlider
} = analysisSlice.actions;

export default analysisSlice.reducer;
