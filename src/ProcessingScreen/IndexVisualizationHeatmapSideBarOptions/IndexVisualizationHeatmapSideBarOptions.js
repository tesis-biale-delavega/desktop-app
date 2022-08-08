import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const IndexVisualizationHeatmapSideBarOptions = ({setOverlayImageData, overlayImageData}) => {
  const generatedIndexes = useSelector(
      (state) => state.analysis.generatedIndexes
    );
  const stitchingData = useSelector(state => state.analysis.stitchingData)

  const defaultLayers = [
    {
      name: "Orthophoto",
      imageUrl:
      stitchingData?.orthophoto_path,
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
    const newOverlayImageData = {...overlayImageData, imageUrl: layerData.imageUrl}
    setOverlayImageData(newOverlayImageData)
  };

  return (
    <Box m={2} flexGrow={1}>
      <Stack justifyContent={"space-between"} height={"100%"}>
        <div>
          <Container>
            <Typography>Heatmap</Typography>
          </Container>
          <Typography color={"#A4A4A4"}>Layers</Typography>
          <List>
            {availableLayers.map((layer) => (
              <ListItem disablePadding>
                <ListItemButton onClick={() => onLayerClick(layer)}>
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
