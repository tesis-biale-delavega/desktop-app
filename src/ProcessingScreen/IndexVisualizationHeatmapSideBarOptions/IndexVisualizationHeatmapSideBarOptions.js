import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const IndexVisualizationHeatmapSideBarOptions = () => {
  const generatedIndexes = useSelector(
    (state) => state.analysis.generatedIndexes
  );

  console.log("indexgen", generatedIndexes);

  const onLayerClick = (layerData) => {
    console.log("value", layerData);
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
            {generatedIndexes.map((index) => (
              <ListItem disablePadding>
                <ListItemButton onClick={() => onLayerClick(index)}>
                  <ListItemText primary={index.name} />
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
