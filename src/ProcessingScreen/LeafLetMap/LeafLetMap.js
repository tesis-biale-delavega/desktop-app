import { LatLngBounds } from "leaflet";
import { ImageOverlay, MapContainer, TileLayer } from "react-leaflet";
import React from "react";

const LeafLetMap = ({ imageUrl, coords }) => {
  const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE;
  const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const neCorner = coords?.[1];
  const swCorner = coords?.[3];
  const neCornerLat = neCorner?.[1]
  const neCornerLng = neCorner?.[0]
  const swCornerLat = swCorner?.[1]
  const swCornerLng = swCorner?.[0]
  
  const hasCoords = neCorner && swCorner

  const bounds = hasCoords && new LatLngBounds(
    [neCornerLat, neCornerLng],
    [swCornerLat, swCornerLng]
  );

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
        {hasCoords &&
          <ImageOverlay
            url={"file://" + imageUrl}
            bounds={bounds}
            zIndex={10}
          />
        }
      </MapContainer>
    </div>
  );
};

export default LeafLetMap;
