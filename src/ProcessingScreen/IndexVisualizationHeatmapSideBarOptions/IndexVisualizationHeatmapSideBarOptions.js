import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const IndexVisualizationHeatmapSideBarOptions = ({
  setOverlayImageData,
  overlayImageData,
}) => {
  const generatedIndexes = useSelector(
    (state) => state.analysis.generatedIndexes
  );
  const stitchingData = useSelector((state) => state.analysis.stitchingData);

  const defaultLayers = [
    {
      name: "Orthophoto",
      imageUrl: stitchingData?.orthophoto_path,
    },
  ];
  const generatedIndexesArray = Object.entries(generatedIndexes).map(
    (index) => {
      return { name: index[0].toUpperCase(), imageUrl: index[1] };
    }
  );

  const availableLayers = [...defaultLayers, ...generatedIndexesArray];

  console.log("indexgen", generatedIndexes);
  console.log("imagedata", overlayImageData);

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
          <Container >
            <Typography mt={2} align={"center"}>Heatmap</Typography>
          </Container>
          <Typography mt={2} ml={2} color={"#A4A4A4"}>Layers</Typography>
          <List>
            {availableLayers.map((layer) => (
              <ListItem disablePadding>
                <ListItemButton selected={layer.name === overlayImageData?.name} onClick={() => onLayerClick(layer)}>
                  <ListItemText primary={layer.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Stack>
    </Box>
  );
};

export default IndexVisualizationHeatmapSideBarOptions;
