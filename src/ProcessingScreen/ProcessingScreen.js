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
import { useDispatch, useSelector } from "react-redux";
import { setProjectPath } from "../analysis/analysisSlice";

const ProcessingScreen = () => {
  const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const processingStates = {
    PRE_STITCHING: 0,
    INDEX_GENERATOR: 1,
    VISUALIZE_INDEXES: 2,
  };

  const [processingState, setProcessingState] = useState(
    processingStates.PRE_STITCHING
  );

  const indexes = [
    { name: "BNDVI", value: "bndvi", selected: false },
    { name: "NDVI", value: "ndvi", selected: false },
    { name: "NDRE", value: "ndre", selected: false },
    { name: "VARI", value: "vari", selected: false },
  ];

  const [selectedIndexes, setSelectedIndexes] = useState(indexes);

  const [stitchingData, setStitchingData] = useState(undefined);

  const folderPath = useSelector((state) => state.analysis.folderPath);
  const projectPath = useSelector((state) => state.analysis.projectPath);

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
        setStitchingData(res);
        dispatch(setProjectPath(res.project_path));
        setProcessingState(processingStates.INDEX_GENERATOR);
      },
      onError: (error) => {
        console.log("error", error);
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

  const generateIndexesMutation = useMutation((body) => {
    return http.post(`index`, body);
  });

  const onGenerateIndexesPress = () => {
    console.log("indexes", selectedIndexes);
    const body = {
      project_path: projectPath,
      indexes: selectedIndexes
        .map((index) => (index.selected ? index.value : ""))
        .filter((indexValue) => indexValue !== ""),
      custom_indexes: [],
    };
    generateIndexesMutation.mutate(body, {
      onSuccess: (res) => {
        console.log("res", res);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
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
              {selectedIndexes.map((index) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={index.selected}
                      onChange={(e) => handleIndexChange(index.name, e)}
                    />
                  }
                  label={index.name}
                />
              ))}
            </FormGroup>
          </div>
          <Button
            variant={"contained"}
            size={"small"}
            onClick={onGenerateIndexesPress}
          >
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

  const diff = 0.0005

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
              {console.log(stitchingData?.orthophoto_path)}
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
