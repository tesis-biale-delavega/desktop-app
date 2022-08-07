import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Map, Source, Layer } from "react-map-gl";
import SideBar from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import IndexGeneratorSideBarOptions from "./IndexGeneratorSideBarOptions/IndexGeneratorSideBarOptions";
import PreStitchingSideBarOptions from "./PreStitchingSideBarOptions/PreStitchingSideBarOptions";
import IndexVisualizationHeatmapSideBarOptions from "./IndexVisualizationHeatmapSideBarOptions/IndexVisualizationHeatmapSideBarOptions";
import {
  GoogleMap,
  OverlayView,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: 46.59916666666667, lng: 6.621111111111111 }}
      mapTypeId={"satellite"}
      options={{maxZoom: 30}}
    >
      <OverlayView
        bounds={{
          ne: { lat: 46.59952603277778, lng: 6.621111111111111 },
          sw: { lat: 46.59916666666667, lng: 6.621410919722223 },
        }}
        /*
         * An alternative to specifying position is specifying bounds.
         * bounds can either be an instance of google.maps.LatLngBounds
         * or an object in the following format:
         * bounds={{
         *    ne: { lat: 62.400471, lng: -150.005608 },
         *    sw: { lat: 62.281819, lng: -150.287132 }
         * }}
         */
        /*
         * 1. Specify the pane the OverlayView will be rendered to. For
         *    mouse interactivity, use `OverlayView.OVERLAY_MOUSE_TARGET`.
         *    Defaults to `OverlayView.OVERLAY_LAYER`.
         */
        mapPaneName={OverlayView.OVERLAY_LAYER}
      >
        <img
          style={{ width: "100%" }}
          src={
            "file://" +
            "/Users/braianb/PycharmProjects/image-processing/test/multispectral/odm_orthophoto/odm_orthophoto.png"
          }
        />
      </OverlayView>
    </GoogleMap>
  ))
);

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

  const [overlayImageData, setOverlayImageData] = useState(undefined);

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
        <MyMapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        {/*<Map
          initialViewState={{
            latitude: 46.59916666666667,
            longitude: 6.621111111111111,
            zoom: 17.6,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={mapboxStyle}
          mapboxAccessToken={mapboxToken}
          asyncRender={true}
        >
          {overlayImageData && (
            <Source
              id="image-source"
              type="image"
              url={"file://" + overlayImageData?.imageUrl}
              //coordinates={overlayImageData?.coords}
              coordinates={[
                [6.6193993636111115, 46.59952603277778],
                [6.621410919722223, 46.59952603277778],
                [6.621410919722223, 46.59673472111111],
                [6.6193993636111115, 46.59673472111111],
              ]}
            >
              <Layer
                id="overlay"
                source="image-source"
                type="raster"
                paint={{ "raster-resampling": "nearest" }}
              />
            </Source>
          )}
        </Map>*/}
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
