import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Map, Source, Layer } from "react-map-gl";
import SideBar from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import IndexGeneratorSideBarOptions from "./IndexGeneratorSideBarOptions/IndexGeneratorSideBarOptions";
import PreStitchingSideBarOptions from "./PreStitchingSideBarOptions/PreStitchingSideBarOptions";
import IndexVisualizationHeatmapSideBarOptions from "./IndexVisualizationHeatmapSideBarOptions/IndexVisualizationHeatmapSideBarOptions";

const ProcessingScreen = () => {
  const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE;

  const navigate = useNavigate();

  const processingStates = {
    PRE_STITCHING: 0,
    INDEX_GENERATOR: 1,
    INDEX_VISUALIZATION_HEATMAP: 2,
  };

  const [processingState, setProcessingState] = useState(
    processingStates.INDEX_VISUALIZATION_HEATMAP
  );

  const [stitchingData, setStitchingData] = useState(undefined);

  const getSideBarOptions = () => {
    switch (processingState) {
      case processingStates.PRE_STITCHING:
        return (
          <PreStitchingSideBarOptions
            setStitchingData={setStitchingData}
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
        return <IndexVisualizationHeatmapSideBarOptions />;
      default:
        break;
    }
  };

  const handleGoBack = () => {
    processingState === 0
      ? navigate("/")
      : setProcessingState(processingState - 1);
  };

  return (
    // TODO: fix the height of the map to fill entire container
    <Box sx={{ display: "flex", height: "91%" }}>
      <SideBar children={getSideBarOptions()} onGoBackClick={handleGoBack} />
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Map
          initialViewState={{
            latitude: 46.59916666666667,
            longitude: 6.621111111111111,
            zoom: 17.6,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={mapboxStyle}
          mapboxAccessToken={mapboxToken}
        >
          {stitchingData && (
            <Source
              id="image-source"
              type="image"
              url={"file://" + stitchingData?.orthophoto_path}
              coordinates={stitchingData?.coords.rgb_points}
            >
              <Layer id="overlay" source="image-source" type="raster" />
            </Source>
          )}
        </Map>
      </Box>
    </Box>
  );
};

/*coords={[
                [6.6214, 46.599],
                [6.63, 46.599],
                [6.63, 46.6],
                [6.6214, 46.6],
              ]}

              coordinates={[
                [6.6193993636111115, 46.59952603277778],
                [6.621410919722223, 46.59952603277778],
                [6.621410919722223, 46.59673472111111],
                [6.6193993636111115, 46.59673472111111],
              ]}

              */

export default ProcessingScreen;
