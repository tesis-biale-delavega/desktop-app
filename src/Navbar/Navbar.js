import {
  AppBar,
  Box,
  createTheme,
  IconButton,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { processingStates } from "../utils/processingStates";
import { useMutation } from "react-query";
import * as http from "../utils/http";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import CompareIcon from "@mui/icons-material/Compare";
import { setProcessingState } from "../analysis/analysisSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#383838",
    },
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const processingState = useSelector(
    (state) => state.analysis.processingState
  );
  const projectPath = useSelector((state) => state.analysis.projectPath);
  const dispatch = useDispatch();

  const handleBtnPress = () => {
    navigate("pre-stitching");
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
    <ThemeProvider theme={theme}>
      <AppBar
        color={"primary"}
        position={"fixed"}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleBtnPress}
          >
            <MenuIcon />
          </IconButton>
          <div>{"Project Name"}</div>
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
    </ThemeProvider>
  );
};

export default Navbar;
