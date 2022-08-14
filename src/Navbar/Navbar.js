import {
  AppBar,
  Box,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { processingStates } from "../utils/processingStates";
import { useMutation } from "react-query";
import * as http from "../utils/http";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import CompareIcon from "@mui/icons-material/Compare";
import { setProcessingState, setProjectName } from "../analysis/analysisSlice";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const processingState = useSelector(
    (state) => state.analysis.processingState
  );
  const projectPath = useSelector((state) => state.analysis.projectPath);
  const projectName = useSelector((state) => state.analysis.projectName);

  const [projectNameEditMode, setProjectNameEditMode] = useState(false);
  const [temporalProjectName, setTemporalProjectName] = useState(projectName);

  const handleHomePress = () => {
    navigate("/");
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

  const handleEditProjectNamePress = () => {
    setProjectNameEditMode(true);
  };

  const handleProjectNameChange = (e) => {
    const value = e.target.value;
    setTemporalProjectName(value);
  };

  const handleConfirmEditProjectName = () => {
    dispatch(setProjectName(temporalProjectName));
    setProjectNameEditMode(false);
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
        {(location.pathname === "/processing" && processingState === processingStates.PRE_STITCHING) && (
          <>
            {projectNameEditMode ? (
              <Box>
                <TextField
                  value={temporalProjectName}
                  onChange={handleProjectNameChange}
                />
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="confirm"
                  onClick={handleConfirmEditProjectName}
                  sx={{ ml: 1 }}
                >
                  <CheckIcon />
                </IconButton>
              </Box>
            ) : (
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>{temporalProjectName}</Typography>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="edit"
                  onClick={handleEditProjectNamePress}
                  sx={{ ml: 1 }}
                >
                  <EditIcon />
                </IconButton>
              </Stack>
            )}
          </>
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
