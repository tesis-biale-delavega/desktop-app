import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Map, Source, Layer } from "react-map-gl";
import SideBar from "../SideBar/SideBar";
import { useMutation } from "react-query";
import * as http from "../utils/http";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProcessingScreen = () => {
  const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE;

  const navigate = useNavigate();

  const processingStates = {
    PRE_STITCHING: 0,
    INDEX_GENERATOR: 1,
    VISUALIZE_INDEXES: 2,
  };

  const [processingState, setProcessingState] = useState(
    processingStates.PRE_STITCHING
  );

  const indexes = [
    { name: "BNDVI", selected: false },
    { name: "NDVI", selected: false },
    { name: "NDRE", selected: false },
  ];

  const [selectedIndexes, setSelectedIndexes] = useState(indexes);

  const [stitchingData, setStitchingData] = useState(undefined);

  const folderPath = useSelector((state) => state.analysis.folderPath);

  const startAnalysisMutation = useMutation((body) => {
    return http.post(`analysis`, body);
  });

  const handleStartProcessing = () => {
    const body = {
      path: folderPath,
      name: "algo",
    };
    const mockedResponse = {
      avg_coords: [46.599518655555556, 6.621405246944445, 829.1021],
      coords: [
        [6.6214, 46.599],
        [6.63, 46.599],
        [6.63, 46.6],
        [6.6214, 46.6],
      ],
      orthophoto_path:
        "/Users/braianb/PycharmProjects/image-processing/algo_05082022204057/rgb/odm_orthophoto/odm_orthophoto.png",
      project_path:
        "/Users/braianb/PycharmProjects/image-processing/algo_05082022204057",
    };
    startAnalysisMutation.mutate(body, {
      onSuccess: (res) => {
        console.log("res", res);
        setProcessingState(processingStates.INDEX_GENERATOR);
      },
      onError: (error) => {
        console.log("error", error);
        setStitchingData(mockedResponse);
        setProcessingState(processingStates.INDEX_GENERATOR);
      },
    });
  };

  console.log(stitchingData);

  const PreStitchingSideBarOptions = () => {
    return (
      <Box m={2}>
        <Button
          variant={"contained"}
          size={"small"}
          onClick={handleStartProcessing}
        >
          Start processing
        </Button>
      </Box>
    );
  };

  const handleIndexChange = (indexName, e) => {
    const target = e.target;
    const checked = target.checked;

    const indexesUpdated = selectedIndexes.map((oldIndex) =>
      oldIndex.name === indexName
        ? {
            ...oldIndex,
            selected: checked,
          }
        : oldIndex
    );
    setSelectedIndexes(indexesUpdated);
  };

  const IndexGeneratorSideBarOptions = () => {
    return (
      <Box m={2} flexGrow={1}>
        <Stack justifyContent={"space-between"} height={"100%"}>
          <div>
            <Container>
              <Typography>Index Generator</Typography>
            </Container>
            <Typography>Indexes</Typography>
            <FormGroup>
              {indexes.map((index) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={index.name}
                  onChange={(e) => handleIndexChange(index.name, e)}
                />
              ))}
            </FormGroup>
          </div>
          <Button variant={"contained"} size={"small"}>
            Generate
          </Button>
        </Stack>
      </Box>
    );
  };

  const getSideBarOptions = () => {
    switch (processingState) {
      case processingStates.PRE_STITCHING:
        return <PreStitchingSideBarOptions />;
      case processingStates.INDEX_GENERATOR:
        return <IndexGeneratorSideBarOptions />;
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
              coordinates={stitchingData?.coords}
            >
              {console.log(stitchingData?.orthophoto_path)}
              <Layer id="overlay" source="image-source" type="raster"/>
            </Source>
          )}
        </Map>
      </Box>
    </Box>
  );
};

export default ProcessingScreen;
