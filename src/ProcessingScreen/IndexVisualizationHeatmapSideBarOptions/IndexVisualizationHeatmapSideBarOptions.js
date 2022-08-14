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
import { useEffect, useState } from "react";
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
      name: "Orthophoto",
      imageUrl: stitchingData?.orthophoto_path,
    },
  ];
  const generatedIndexesArray = Object.entries(generatedIndexes).map(
    (index) => {
      return {
        name: index[0].toUpperCase(),
        imageUrl: index[1]?.img,
        imageVector: index[1]?.vector,
      };
    }
  );

  const [availableLayers, setAvailableLayers] = useState([
    ...defaultLayers,
    ...generatedIndexesArray,
  ]);

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
      coords: overlayImageData.coords,
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
              Heatmap
            </Typography>
          </Container>
          <Typography mt={2} ml={2} color={"#A4A4A4"}>
            Layers
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
              Create threshold
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
