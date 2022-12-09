import React, { useEffect, useState } from "react";
import {
  Button,
  createTheme,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setFolderPath } from "../analysis/analysisSlice";
import { useNavigate } from "react-router-dom";

const ImportImagesScreen = () => {
  const fileInput = React.useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentFolder, setCurrentFolderPath] = useState(undefined);
  const [currentImages, setCurrentImages] = useState(undefined);

  useEffect(() => {
    if (fileInput.current !== null) {
      fileInput.current.setAttribute("directory", "");
      fileInput.current.setAttribute("webkitdirectory", "");
    }
  }, [fileInput]);

  const onFileInputChange = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const firstFilePath = files[0].path;
      const splitChar = firstFilePath.includes("\\") ? "\\" : "/";
      const folderPathSplit = firstFilePath.split(splitChar).slice(0, -1);
      const folderPath = folderPathSplit.join(splitChar);

      setCurrentFolderPath(folderPath);
      setCurrentImages(files);
    }
  };

  const onConfirmPress = () => {
    dispatch(setFolderPath(currentFolder));
    currentFolder && navigate("/processing");
  };

  const getImageName = (imagePath) => {
    const splitChar = imagePath.includes("\\") ? "\\" : "/";
    const imagePathSplit = imagePath.split(splitChar).slice();
    return imagePathSplit[imagePathSplit.length - 1];
  };

  return (
    <Stack flexGrow={1} maxHeight={"100vh"}>
      <Toolbar />
      {currentImages && (
        <ImageList sx={{ width: "100%" }} variant="standard" cols={4} gap={8}>
          {Array.from(currentImages)
            ?.filter(
              (imageData) =>
                imageData.type === "image/jpeg" ||
                imageData.type === "image/png"
            )
            .slice(0, 20)
            .map((imageData) => (
              <ImageListItem key={imageData?.path}>
                <img
                  src={`file://${imageData.path}?w=248&fit=crop&auto=format`}
                  srcSet={`file://${imageData.path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={imageData.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  position="bottom"
                  title={getImageName(imageData.path)}
                />
              </ImageListItem>
            ))}
        </ImageList>
      )}
      <Stack
        flexDirection={"row"}
        alignItems={currentImages ? "flex-end" : "center"}
        justifyContent={currentImages ? "space-evenly" : "center"}
        flexGrow={1}
        mb={2}
      >
        {!currentFolder && (
          <Typography>
            Por favor seleccione la carpeta que contiene las imágenes que desea
            procesar. Estas deben tener la extensión .tiff o .jpg.
          </Typography>
        )}
        <>
          <Button
            variant={"contained"}
            onClick={() => fileInput.current.click()}
            sx={{ ml: 2, mr: 2 }}
            fullWidth={currentImages}
          >
            {"Importar imagenes (.tiff, .jpg)"}
          </Button>
          <input
            ref={fileInput}
            type="file"
            onChange={onFileInputChange}
            style={{ display: "none" }}
          />
        </>
        {currentFolder && (
          <Button
            variant={"contained"}
            onClick={onConfirmPress}
            sx={{ ml: 2, mr: 2 }}
            fullWidth
          >
            {"Avanzar"}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default ImportImagesScreen;
