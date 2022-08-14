import {
  AppBar,
  Box,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { processingStates } from "../utils/processingStates";
import { useMutation } from "react-query";
import * as http from "../utils/http";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import CompareIcon from "@mui/icons-material/Compare";
import { setProcessingState } from "../analysis/analysisSlice";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const Navbar = () => {
  const navigate = useNavigate();
  const processingState = useSelector(
    (state) => state.analysis.processingState
  );
  const projectPath = useSelector((state) => state.analysis.projectPath);
  const dispatch = useDispatch();

  const [projectNameEditMode, setProjectNameEditMode] = useState(false);

  const handleHomePress = () => {
    navigate("/");
  };

  const handleEditProjectNamePress = () => {
    setProjectNameEditMode(true);
  };

  const exportProjectMutation = useMutation((body) => {
    return http.post(`compress`, body);
  });

  const handleExportProjectPress = () => {
    const body = { path: projectPath };

    exportProjectMutation.mutate(body, {
      onSuccess: (res) => {
        console.log("res", res);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  };

  const handleCompareSliderPress = () => {
    dispatch(setProcessingState(processingStates.IMAGE_COMPARISON_SLIDER));
  };

  return (
    <AppBar
      position={"fixed"}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#383838",
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}
          onClick={handleHomePress}
        >
          <HomeIcon />
        </IconButton>
        {projectNameEditMode ? (
          <Box>
            <TextField value={"Project unnamed"} />
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="confirm"
              onClick={handleEditProjectNamePress}
            >
              <CheckIcon />
            </IconButton>
          </Box>
        ) : (
          <Container>
            <Typography>Project unnamed</Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="edit"
              onClick={handleEditProjectNamePress}
            >
              <EditIcon />
            </IconButton>
          </Container>
        )}
        {(processingState === processingStates.INDEX_VISUALIZATION_HEATMAP ||
          processingState === processingStates.IMAGE_COMPARISON_SLIDER) && (
          <Box ml={"auto"}>
            {processingState !== processingStates.IMAGE_COMPARISON_SLIDER && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="export-project"
                onClick={handleCompareSliderPress}
              >
                <CompareIcon />
              </IconButton>
            )}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="export-project"
              onClick={handleExportProjectPress}
            >
              <GetAppOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
