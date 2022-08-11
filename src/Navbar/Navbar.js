import {
  AppBar,
  createTheme,
  IconButton,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import {useSelector} from "react-redux";
import {processingStates} from "../utils/processingStates";
import {useMutation} from "react-query";
import * as http from "../utils/http";

const theme = createTheme({
  palette: {
    primary: {
      main: "#383838",
    },
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const processState = useSelector(state => state.analysis.processState)
  const projectPath = useSelector(state => state.analysis.projectPath)

  const handleBtnPress = () => {
    navigate("pre-stitching");
  };

  const exportProjectMutation = useMutation((body) => {
    return http.post(`compress`, body);
  });

  const handleExportProjectPress = () => {
    const body = {path: projectPath}

    exportProjectMutation.mutate(body, {
      onSuccess: (res) => {
        console.log("res", res)
      },
      onError: (error) => {
        console.log("error", error);
      }
    })
  }

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
          {processState === processingStates.INDEX_VISUALIZATION_HEATMAP &&
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="export-project"
              sx={{ ml: "auto" }}
              onClick={handleExportProjectPress}
            >
              <GetAppOutlinedIcon />
            </IconButton>
          }
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
