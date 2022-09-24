import React from "react";
import "./index.scss";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import {BrowserRouter, HashRouter} from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { render } from 'react-dom'

const themeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#b7821d",
    },
    secondary: {
      main: "#f50057",
    },
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
    MuiInputLabel: {
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
            borderBottom: "1px solid #fff !important"
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: "#4d4d4d",
            backgroundColor: "#757373"
          }
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

const queryClient = new QueryClient();

let persistor = persistStore(store);

let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

render(<HashRouter>
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </ThemeProvider>
</HashRouter>, document.getElementById('root'))
