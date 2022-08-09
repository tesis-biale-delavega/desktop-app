import {
  Box,
  Container,
  Grid, Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import {useState} from "react";
import FormDialog from "../../FormDialog/FormDialog";
import ThresholdCreatorDialog from "../ThresholdCreatorDialog/ThresholdCreatorDialog";

const IndexVisualizationHeatmapSideBarOptions = ({
  setOverlayImageData,
  overlayImageData,
}) => {
  const generatedIndexes = useSelector(
    (state) => state.analysis.generatedIndexes
  );
  const stitchingData = useSelector((state) => state.analysis.stitchingData);
  const [showThresholdDialog, setShowThresholdDialog] = useState(false)

  const defaultLayers = [
    {
      name: "Orthophoto",
      imageUrl: stitchingData?.orthophoto_path,
    },
  ];
  const generatedIndexesArray = Object.entries(generatedIndexes).map(
    (index) => {
      return { name: index[0].toUpperCase(), imageUrl: index[1].img };
    }
  );

  const availableLayers = [...defaultLayers, ...generatedIndexesArray];

  const handleCreateThresholdClick = () => {
    setShowThresholdDialog(true)
  }

  const handleDialogClose = () => {
    setShowThresholdDialog(false)
  }

  const onLayerClick = (layerData) => {
    console.log("value", layerData);
    const newOverlayImageData = {
      ...overlayImageData,
      imageUrl: layerData.imageUrl,
      name: layerData.name
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
          >
            <Typography mt={2}>Create threshold</Typography>
          </Link>
        </div>
      </Stack>
      {showThresholdDialog && <ThresholdCreatorDialog isOpen={showThresholdDialog} handleClose={handleDialogClose} />}
    </Box>
  );
};

export default IndexVisualizationHeatmapSideBarOptions;
