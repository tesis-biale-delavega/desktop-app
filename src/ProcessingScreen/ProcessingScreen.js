import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Toolbar } from "@mui/material";
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
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const ProcessingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const processingState = useSelector(
    (state) => state.analysis.processingState
  );
  const compareLayersSlider = useSelector(
    (state) => state.analysis.compareLayersSlider
  );

  const [overlayImageData, setOverlayImageData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(setProcessingState(processingStates.PRE_STITCHING));
  }, []);

  const getSideBarOptions = () => {
    switch (processingState) {
      case processingStates.PRE_STITCHING:
        return (
          <PreStitchingSideBarOptions
            setOverlayImageData={setOverlayImageData}
            setIsLoading={setIsLoading}
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
      <Stack direction={"column"} flexGrow={1}>
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar />
          {processingState === processingStates.IMAGE_COMPARISON_SLIDER ? (
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage
                  src={"file://" + compareLayersSlider?.leftLayer?.imageUrl}
                  style={{ objectFit: "contain", backgroundColor: "#535353" }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={"file://" + compareLayersSlider?.rightLayer?.imageUrl}
                  style={{ objectFit: "contain", backgroundColor: "#535353" }}
                />
              }
            />
          ) : (
            <LeafLetMap
              imageUrl={overlayImageData?.imageUrl}
              imageCoords={overlayImageData?.imageCoords}
              centerCoords={overlayImageData?.centerCoords}
            />
          )}
        </Box>
        {isLoading && (
          <Box sx={{position: "absolute"}}>
            <CircularProgress />
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default ProcessingScreen;
