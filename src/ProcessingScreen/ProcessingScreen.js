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
import {
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngBounds } from "leaflet";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: 46.59916666666667, lng: 6.621111111111111 }}
      mapTypeId={"satellite"}
    >
      <OverlayView
        bounds={{
          ne: { lat: 46.59952603277778, lng: 6.621111111111111 },
          sw: { lat: 46.59916666666667, lng: 6.621410919722223 },
        }}
        mapPaneName={OverlayView.OVERLAY_LAYER}
      >
        {/*<img
          style={{ width: "100%" }}
          src={
            "file://" +
            "/Users/braianb/PycharmProjects/image-processing/test/multispectral/odm_orthophoto/odm_orthophoto.png"
          }
        />*/}
        <img
          style={{ width: "100%", height: "100%" }}
          src={
            "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1575"
          }
        />
      </OverlayView>
    </GoogleMap>
  ))
);

const bounds = new LatLngBounds(
  [46.59952603277778, 6.621410919722223],
  [46.59673472111111, 6.6193993636111115]
);

const LeafLetMap = () => {
  const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE;
  const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={[46.59916666666667, 6.621111111111111]}
        zoom={17}
        maxZoom={30}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={
            mapboxStyle +
            "/tiles/256/{z}/{x}/{y}@2x?access_token=" +
            mapboxToken
          }
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        <ImageOverlay
          url={
            "file://" +
            "/Users/braianb/PycharmProjects/image-processing/test/multispectral/odm_orthophoto/odm_orthophoto.png"
          }
          bounds={bounds}
          zIndex={10}
        />
      </MapContainer>
    </div>
  );
};

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
        <LeafLetMap />
        {/*<MyMapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />*/}
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
