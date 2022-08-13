import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import SideBar from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import IndexGeneratorSideBarOptions from "./IndexGeneratorSideBarOptions/IndexGeneratorSideBarOptions";
import PreStitchingSideBarOptions from "./PreStitchingSideBarOptions/PreStitchingSideBarOptions";
import IndexVisualizationHeatmapSideBarOptions from "./IndexVisualizationHeatmapSideBarOptions/IndexVisualizationHeatmapSideBarOptions";
import "leaflet/dist/leaflet.css";
import LeafLetMap from "./LeafLetMap/LeafLetMap";
import CustomIndexCreationSideBarOptions from "./CustomIndexCreationSideBarOptions/CustomIndexCreationSideBarOptions";
import { useDispatch, useSelector } from "react-redux";
import { processingStates } from "../utils/processingStates";
import { setProcessingState } from "../analysis/analysisSlice";
import ComparisonSliderSideBarOptions from "./ComparisonSliderSideBarOptions/ComparisonSliderSideBarOptions";
import ReactCompareImage from "react-compare-image";

const ProcessingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const processingState = useSelector(
    (state) => state.analysis.processingState
  );

  const [overlayImageData, setOverlayImageData] = useState(undefined);

  const getSideBarOptions = () => {
    switch (processingState) {
      case processingStates.PRE_STITCHING:
        return (
          <PreStitchingSideBarOptions
            setOverlayImageData={setOverlayImageData}
          />
        );
      case processingStates.INDEX_GENERATOR:
        return <IndexGeneratorSideBarOptions />;
      case processingStates.INDEX_VISUALIZATION_HEATMAP:
        return (
          <IndexVisualizationHeatmapSideBarOptions
            setOverlayImageData={setOverlayImageData}
            overlayImageData={overlayImageData}
          />
        );
      case processingStates.CUSTOM_INDEX_CREATION:
        return <CustomIndexCreationSideBarOptions />;
      case processingStates.IMAGE_COMPARISON_SLIDER:
        return <ComparisonSliderSideBarOptions />;
      default:
        break;
    }
  };

  const handleGoBack = () => {
    if (processingState === processingStates.CUSTOM_INDEX_CREATION) {
      dispatch(setProcessingState(processingStates.INDEX_GENERATOR));
    } else {
      processingState === 0
        ? navigate("/")
        : dispatch(setProcessingState(processingState - 1));
    }
  };

  return (
    // TODO: fix the height of the map to fill entire container
    <Box sx={{ display: "flex", height: "91%" }}>
      <SideBar children={getSideBarOptions()} onGoBackClick={handleGoBack} />
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar />
        {processingState === processingStates.IMAGE_COMPARISON_SLIDER ? (
          <ReactCompareImage
            leftImage={
              "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg"
            }
            rightImage={
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
            }
          />
        ) : (
          <LeafLetMap
            imageUrl={overlayImageData?.imageUrl}
            coords={overlayImageData?.coords}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProcessingScreen;
