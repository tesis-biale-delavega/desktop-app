import { createSlice } from "@reduxjs/toolkit";

const indexes = [
  {
    name: "BNDVI",
    value: "bndvi",
    selected: false,
    info:
      "Los valores negativos están formados principalmente por nubes, agua o nieve, y los valores cercanos a cero por rocas o suelo. Valores moderados (de 0,2 a 0,3) representan arbustos y prados, mientras que valores grandes (de 0,6 a 0,8) indican bosques tropicales y templados.\n" +
      "\n" +
      "Las plantas siempre toman valores positivos entre 0,2 y 1. La vegetación densa y saludable debe tener un valor superior a 0,5. Un valor entre 0.2 y 0.5 indica una vegetación escasa.\n",
  },
  { name: "NDVI", value: "ndvi", selected: false },
  { name: "NDRE", value: "ndre", selected: false },
  { name: "VARI", value: "vari", selected: false },
];

const initialState = {
  folderPath: "",
  stitchingData: undefined,
  projectPath: "",
  generatedIndexes: [],
  indexesData: indexes,
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
  setIndexesData,
} = analysisSlice.actions;

export default analysisSlice.reducer;
