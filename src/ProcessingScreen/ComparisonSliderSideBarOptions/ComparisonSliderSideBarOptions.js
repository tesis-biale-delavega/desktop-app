import { useSelector } from "react-redux";
import {
  Box,
  Container, FormControl, InputLabel, MenuItem, Select,
  Stack,
  Typography,
} from "@mui/material";
import {useState} from "react";

const ComparisonSliderSideBarOptions = ({
  setOverlayImageData,
  overlayImageData,
}) => {
  const generatedIndexes = useSelector(
    (state) => state.analysis.generatedIndexes
  );
  const stitchingData = useSelector((state) => state.analysis.stitchingData);

  const [compareLayers, setCompareLayers] = useState({leftLayer: "Ortho", rightLayer: "FirstIndex"})

  return (
    <Box flexGrow={1}>
      <Stack justifyContent={"space-between"} height={"100%"}>
        <div>
          <Container>
            <Typography mt={2} align={"center"}>
              Comparison Slider
            </Typography>
          </Container>
          <Box m={2}>
            <FormControl fullWidth>
              <Typography mb={2} color={"#A4A4A4"}>
                Left layer
              </Typography>
              <Select value={compareLayers.leftLayer}>
                <MenuItem value={"Ortho"}>Ortho</MenuItem>
                <MenuItem value={"FirstIndex"}>FirstIndex</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin={"normal"}>
              <Typography mb={2} color={"#A4A4A4"}>
                Right layer
              </Typography>
              <Select value={compareLayers.rightLayer}>
                <MenuItem value={"Ortho"}>Ortho</MenuItem>
                <MenuItem value={"FirstIndex"}>FirstIndex</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </Stack>
    </Box>
  );
};

export default ComparisonSliderSideBarOptions;
