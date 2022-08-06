import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider} from "@mui/material";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter} from "react-router-dom";
import { store } from './app/store'
import { Provider } from 'react-redux'

const themeOptions = {
    palette: {
        type: "light",
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
                    background: "#787878",
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
    },
};

const theme = createTheme(themeOptions);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </QueryClientProvider>
        </ThemeProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
