import {
  AppBar,
  createTheme,
  IconButton,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#383838",
    },
  },
});

const Navbar = () => {
  const navigate = useNavigate();

  const handleBtnPress = () => {
    navigate("pre-stitching");
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
          <div>{"Import Images"}</div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
