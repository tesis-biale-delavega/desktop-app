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
  /*const generatedIndexes = useSelector(
      (state) => state.analysis.generatedIndexes
    );*/

  const generatedIndexes = {
    ndvi: "/Users/braianb/PycharmProjects/image-processing/test/index_ndvi.png",
  };

  const defaultLayers = [
    {
      name: "Orthophoto",
      imageUrl:
        "/Users/braianb/PycharmProjects/image-processing/loquequieras_22062022_183507/rgb/odm_orthophoto/odm_orthophoto.png",
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
