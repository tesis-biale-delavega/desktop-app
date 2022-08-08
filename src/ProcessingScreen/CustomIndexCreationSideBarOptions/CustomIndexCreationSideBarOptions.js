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

const CustomIndexCreationSideBarOptions = ({
  setProcessingState,
  processingStates,
}) => {
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
          />
          <TextField
            id="standard-multiline-static"
            label="Index formula"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            margin={"dense"}
          />
        </div>
        <Button variant={"contained"} size={"small"}>
          Create
        </Button>
      </Stack>
    </Box>
  );
};

export default CustomIndexCreationSideBarOptions;
