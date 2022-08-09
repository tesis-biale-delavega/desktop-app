import { createSlice } from "@reduxjs/toolkit";

const indexes = [
  { name: "BNDVI", value: "bndvi", selected: false },
  { name: "NDVI", value: "ndvi", selected: false },
  { name: "NDRE", value: "ndre", selected: false },
  { name: "VARI", value: "vari", selected: false },
];

const initialState = {
  folderPath: "",
  stitchingData: undefined,
  projectPath: "",
  generatedIndexes: [],
  indexesData: indexes
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
  },
});

export const {
  setFolderPath,
  setStitchingData,
  setProjectPath,
  setGeneratedIndexes,
  setIndexesData
} = analysisSlice.actions;

export default analysisSlice.reducer;
