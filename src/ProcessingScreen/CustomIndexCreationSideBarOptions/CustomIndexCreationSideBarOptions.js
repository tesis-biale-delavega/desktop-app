import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIndexesData,
  setProcessingState,
} from "../../analysis/analysisSlice";
import { processingStates } from "../../utils/processingStates";

const CustomIndexCreationSideBarOptions = () => {
  const dispatch = useDispatch();
  const indexesData = useSelector((state) => state.analysis.indexesData);
  const [customIndexData, setCustomIndexData] = useState(undefined);

  const handleCreateClick = () => {
    dispatch(setProcessingState(processingStates.INDEX_GENERATOR));
    dispatch(setIndexesData([...indexesData, customIndexData]));
  };

  return (
    <Box m={2} flexGrow={1}>
      <Stack justifyContent={"space-between"} height={"100%"}>
        <div>
          <Container>
            <Typography>Indice Personalizado</Typography>
          </Container>
          <Typography mt={2}>Indice</Typography>
          <TextField
            id="standard-basic"
            label="Nombre"
            variant="standard"
            fullWidth
            margin={"dense"}
            onChange={(e) =>
              setCustomIndexData({ ...customIndexData, name: e.target.value })
            }
          />
          <TextField
            id="standard-multiline-static"
            label="Formula"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            margin={"dense"}
            onChange={(e) =>
              setCustomIndexData({
                ...customIndexData,
                formula: e.target.value,
              })
            }
          />
        </div>
        <Button
          disabled={!customIndexData?.name || !customIndexData?.formula}
          variant={"contained"}
          size={"small"}
          onClick={handleCreateClick}
        >
          Crear
        </Button>
      </Stack>
    </Box>
  );
};

export default CustomIndexCreationSideBarOptions;
