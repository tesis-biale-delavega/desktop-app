import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { setCompareLayersSlider } from "../../analysis/analysisSlice";

const ComparisonSliderSideBarOptions = ({
  setOverlayImageData,
  overlayImageData,
}) => {
  const dispatch = useDispatch();
  const availableImageLayers = useSelector(
    (state) => state.analysis.availableImageLayers
  );

  const [compareLayers, setCompareLayers] = useState({
    leftLayer: availableImageLayers?.[0],
    rightLayer: availableImageLayers?.[1],
  });

  const handleLayerChange = (e, isLeftLayer) => {
    const value = e.target.value;
    const layer = availableImageLayers.find(
      (layer) => layer.imageUrl === value
    );
    const newCompareLayers = isLeftLayer
      ? { ...compareLayers, leftLayer: layer }
      : {
          ...compareLayers,
          rightLayer: layer,
        };
    dispatch(setCompareLayersSlider(newCompareLayers));
    setCompareLayers(newCompareLayers);
  };

  return (
    <Box flexGrow={1}>
      <Stack justifyContent={"space-between"} height={"100%"}>
        <div>
          <Container>
            <Typography mt={2} align={"center"}>
              Slider Comparativo
            </Typography>
          </Container>
          <Box m={2}>
            <FormControl fullWidth>
              <Typography mb={2} color={"#A4A4A4"}>
                Capa izquierda
              </Typography>
              <Select
                value={compareLayers.leftLayer?.imageUrl}
                onChange={(e) => handleLayerChange(e, true)}
              >
                {availableImageLayers.map((layer) => (
                  <MenuItem value={layer.imageUrl}>{layer.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin={"normal"}>
              <Typography mb={2} color={"#A4A4A4"}>
                Capa derecha
              </Typography>
              <Select
                value={compareLayers.rightLayer?.imageUrl}
                onChange={(e) => handleLayerChange(e, false)}
              >
                {availableImageLayers.map((layer) => (
                  <MenuItem value={layer.imageUrl}>{layer.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      </Stack>
    </Box>
  );
};

export default ComparisonSliderSideBarOptions;
