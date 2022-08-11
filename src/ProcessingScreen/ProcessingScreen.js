import React, {useEffect, useState} from "react";
import { Box, Toolbar } from "@mui/material";
import SideBar from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import IndexGeneratorSideBarOptions from "./IndexGeneratorSideBarOptions/IndexGeneratorSideBarOptions";
import PreStitchingSideBarOptions from "./PreStitchingSideBarOptions/PreStitchingSideBarOptions";
import IndexVisualizationHeatmapSideBarOptions from "./IndexVisualizationHeatmapSideBarOptions/IndexVisualizationHeatmapSideBarOptions";
import "leaflet/dist/leaflet.css";
import LeafLetMap from "./LeafLetMap/LeafLetMap";
import CustomIndexCreationSideBarOptions from "./CustomIndexCreationSideBarOptions/CustomIndexCreationSideBarOptions";
import {useDispatch} from "react-redux";
import {setProcessState} from "../analysis/analysisSlice";
import {processingStates} from "../utils/processingStates";

const ProcessingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [processingState, setProcessingState] = useState(
    processingStates.INDEX_VISUALIZATION_HEATMAP
  );

  const [overlayImageData, setOverlayImageData] = useState(undefined);

  useEffect(() => {
    dispatch(setProcessState(processingState))
  }, [processingState])

  const getSideBarOptions = () => {
    switch (processingState) {
      case processingStates.PRE_STITCHING:
        return (
          <PreStitchingSideBarOptions
            setOverlayImageData={setOverlayImageData}
            setProcessingState={setProcessingState}
            processingStates={processingStates}
          />
        );
      case processingStates.INDEX_GENERATOR:
        return (
          <IndexGeneratorSideBarOptions
            setProcessingState={setProcessingState}
            processingStates={processingStates}
          />
        );
      case processingStates.INDEX_VISUALIZATION_HEATMAP:
        return (
          <IndexVisualizationHeatmapSideBarOptions
            setOverlayImageData={setOverlayImageData}
            overlayImageData={overlayImageData}
          />
        );
      case processingStates.CUSTOM_INDEX_CREATION:
        return (
          <CustomIndexCreationSideBarOptions
            setProcessingState={setProcessingState}
            processingStates={processingStates}
          />
        );
      default:
        break;
    }
  };

  const handleGoBack = () => {
    if (processingState === processingStates.CUSTOM_INDEX_CREATION) {
      setProcessingState(processingStates.INDEX_GENERATOR);
    } else {
      processingState === 0
        ? navigate("/")
        : setProcessingState(processingState - 1);
    }
  };

  return (
    // TODO: fix the height of the map to fill entire container
    <Box sx={{ display: "flex", height: "91%" }}>
      <SideBar children={getSideBarOptions()} onGoBackClick={handleGoBack} />
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar />
        <LeafLetMap
          imageUrl={overlayImageData?.imageUrl}
          coords={overlayImageData?.coords}
        />
      </Box>
    </Box>
  );
};

export default ProcessingScreen;
