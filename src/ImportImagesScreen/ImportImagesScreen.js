import React, {useEffect} from "react";
import "./ImportImagesScreen.scss"
import {Button, createTheme, ThemeProvider} from "@mui/material";


const theme = createTheme({
    palette: {
        primary: {
            main: "#B1B1B1",
        },
    },
});

const ImportImagesScreen = () => {
    const fileInput = React.useRef();

    useEffect(() => {
        if (fileInput.current !== null) {
            fileInput.current.setAttribute("directory", "");
            fileInput.current.setAttribute("webkitdirectory", "");
        }
    }, [fileInput]);

    return <ThemeProvider theme={theme}>
        <div className={"import-images-screen-container"}>
            <Button className={"import-button"} variant={"contained"} onClick={() => fileInput.current.click()}>
                {"Import Images (.tiff, .jpg)"}
            </Button>
            <input
                ref={fileInput}
                type="file"
                onChange={(event) => console.log("files changed", event.target.files)}
                style={{display: 'none'}}
            />
        </div>
    </ThemeProvider>
}

export default ImportImagesScreen;