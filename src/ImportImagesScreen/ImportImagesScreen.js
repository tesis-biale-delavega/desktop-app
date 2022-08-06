import React, {useEffect} from "react";
import "./ImportImagesScreen.scss"
import {Button, createTheme, ThemeProvider} from "@mui/material";
import {useDispatch} from "react-redux";
import {setFolderPath} from "../analysis/analysisSlice";


const theme = createTheme({
    palette: {
        primary: {
            main: "#B1B1B1",
        },
    },
});

const ImportImagesScreen = () => {
    const fileInput = React.useRef();
    const dispatch = useDispatch()

    useEffect(() => {
        if (fileInput.current !== null) {
            fileInput.current.setAttribute("directory", "");
            fileInput.current.setAttribute("webkitdirectory", "");
        }
    }, [fileInput]);

    const onFileInputChange = (event) => {
        const files = event.target.files

        if(files.length > 0) {
            const firstFilePath = files[0].path
            const folderPathSplit = firstFilePath.split("/").slice(0, -1)
            const folderPath = folderPathSplit.join("/")

            console.log("files changed", event.target.files)
            console.log("files changed", folderPath)
            dispatch(setFolderPath(folderPath))
        }
    }

    return <ThemeProvider theme={theme}>
        <div className={"import-images-screen-container"}>
            <Button className={"import-button"} variant={"contained"} onClick={() => fileInput.current.click()}>
                {"Import Images (.tiff, .jpg)"}
            </Button>
            <input
                ref={fileInput}
                type="file"
                onChange={onFileInputChange}
                style={{display: 'none'}}
            />
        </div>
    </ThemeProvider>
}

export default ImportImagesScreen;