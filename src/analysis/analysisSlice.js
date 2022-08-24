import { createSlice } from "@reduxjs/toolkit";
import { indexes } from "../utils/indexes";
import { processingStates } from "../utils/processingStates";

const initialState = {
  folderPath: "",
  stitchingData: undefined,
  projectName: "Proyecto sin nombre",
  projectPath: "",
  generatedIndexes: [],
  indexesData: indexes,
  processingState: processingStates.PRE_STITCHING,
  availableImageLayers: [],
  compareLayersSlider: undefined,
  projectFolderAlreadyCreated: false,
  processingIsLoading: false,
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
    setProjectName: (state, action) => {
      state.projectName = action.payload;
    },
    setProjectFolderAlreadyCreated: (state, action) => {
      state.projectFolderAlreadyCreated = action.payload;
    },
    setProcessingIsLoading: (state, action) => {
      state.processingIsLoading = action.payload;
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
  setCompareLayersSlider,
  setProjectName,
  setProjectFolderAlreadyCreated,
  setProcessingIsLoading,
} = analysisSlice.actions;

export default analysisSlice.reducer;
