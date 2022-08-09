import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setIndexesData} from "../../analysis/analysisSlice";

const CustomIndexCreationSideBarOptions = ({
  setProcessingState,
  processingStates,
}) => {
  const dispatch = useDispatch()
  const indexesData = useSelector(state => state.analysis.indexesData)
  const [customIndexData, setCustomIndexData] = useState(undefined)

  const handleCreateClick = () => {
    setProcessingState(processingStates.INDEX_GENERATOR)
    dispatch(setIndexesData([...indexesData, customIndexData]))
  }

  return (
    <Box m={2} flexGrow={1}>
      <Stack justifyContent={"space-between"} height={"100%"}>
        <div>
          <Container>
            <Typography>Custom Index Creator</Typography>
          </Container>
          <Typography mt={2}>Index</Typography>
          <TextField
            id="standard-basic"
            label="Index name"
            variant="standard"
            fullWidth
            margin={"dense"}
            onChange={(e) => setCustomIndexData({...customIndexData, name: e.target.value})}
          />
          <TextField
            id="standard-multiline-static"
            label="Index formula"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            margin={"dense"}
            onChange={(e) => setCustomIndexData({...customIndexData, formula: e.target.value})}
          />
        </div>
        <Button disabled={!customIndexData?.name || !customIndexData?.formula} variant={"contained"} size={"small"} onClick={handleCreateClick}>
          Create
        </Button>
      </Stack>
    </Box>
  );
};

export default CustomIndexCreationSideBarOptions;
