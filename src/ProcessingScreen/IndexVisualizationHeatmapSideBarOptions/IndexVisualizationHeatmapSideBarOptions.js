import {
  Box,
  Container,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ThresholdCreatorDialog from "../ThresholdCreatorDialog/ThresholdCreatorDialog";
import { setAvailableImageLayers } from "../../analysis/analysisSlice";

const IndexVisualizationHeatmapSideBarOptions = ({
  setOverlayImageData,
  overlayImageData,
}) => {
  const dispatch = useDispatch();
  const generatedIndexes = useSelector(
    (state) => state.analysis.generatedIndexes
  );
  const stitchingData = useSelector((state) => state.analysis.stitchingData);
  const [showThresholdDialog, setShowThresholdDialog] = useState(false);

  const defaultLayers = [
    {
      name: "Ortofotografía",
      imageUrl: stitchingData?.orthophoto_path,
      centerCoords: stitchingData?.centerCoords,
      imageCoords: stitchingData?.imageCoords,
    },
  ];
  console.log(generatedIndexes);
  const generatedIndexesArray = generatedIndexes?.map((index) => {
    return {
      name: index?.index?.toUpperCase(),
      imageUrl: index?.path,
      imageVector: index?.vector,
    };
  });

  const [availableLayers, setAvailableLayers] = useState([
    ...defaultLayers,
    ...generatedIndexesArray,
  ]);

  useEffect(() => {
    const orthophotoData = defaultLayers[0];
    !overlayImageData && setOverlayImageData(orthophotoData);
  }, []);

  useEffect(() => {
    dispatch(setAvailableImageLayers(availableLayers));
  }, [availableLayers]);

  const handleCreateThresholdClick = () => {
    setShowThresholdDialog(true);
  };

  const handleThresholdDialogClose = () => {
    setShowThresholdDialog(false);
  };

  const onLayerClick = (layerData) => {
    const newOverlayImageData = {
      centerCoords: overlayImageData.centerCoords,
      imageCoords: overlayImageData.imageCoords,
      imageUrl: layerData.imageUrl,
      imageVector: layerData.imageVector,
      name: layerData.name,
    };
    setOverlayImageData(newOverlayImageData);
  };

  return (
    <Box flexGrow={1}>
      <Stack justifyContent={"space-between"} height={"100%"}>
        <div>
          <Container>
            <Typography mt={2} align={"center"}>
              Mapa de calor
            </Typography>
          </Container>
          <Typography mt={2} ml={2} color={"#A4A4A4"}>
            Capas
          </Typography>
          <List>
            {availableLayers.map((layer) => (
              <ListItem disablePadding>
                <ListItemButton
                  selected={layer.name === overlayImageData?.name}
                  onClick={() => onLayerClick(layer)}
                >
                  <ListItemText primary={layer.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Link
            component="button"
            variant="body2"
            onClick={handleCreateThresholdClick}
            underline={"none"}
            color={"#ffffff"}
            disabled={!overlayImageData?.imageVector}
          >
            <Typography mt={2} ml={2}>
              Crear threshold
            </Typography>
          </Link>
        </div>
      </Stack>
      {showThresholdDialog && (
        <ThresholdCreatorDialog
          isOpen={showThresholdDialog}
          handleClose={handleThresholdDialogClose}
          layerData={overlayImageData}
          availableLayers={availableLayers}
          setAvailableLayers={setAvailableLayers}
          onLayerClick={onLayerClick}
        />
      )}
    </Box>
  );
};

export default IndexVisualizationHeatmapSideBarOptions;
