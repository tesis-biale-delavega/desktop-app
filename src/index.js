import React from "react";
import "./index.scss";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { render } from "react-dom";

const themeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#41A44D",
    },
    secondary: {
      main: "#bdff00",
    },
    text: {
      primary: "#fff",
      secondary: "#27c539",
    }
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#383838",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&:before": {
            borderBottom: "1px solid #27c539 !important",
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

const queryClient = new QueryClient();

let persistor = persistStore(store);

let root = document.createElement("div");

root.id = "root";
document.body.appendChild(root);

render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
