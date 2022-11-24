import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import {
  clearState,
  setGeneratedIndexes,
  setProcessingState,
  setProjectFolderAlreadyCreated,
  setProjectName,
  setProjectPath,
  setStitchingData,
} from "../analysis/analysisSlice";
import { useMutation } from "react-query";
import * as http from "../utils/http";
import moment from "moment";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import { processingStates } from "../utils/processingStates";
import CachedIcon from "@mui/icons-material/Cached";

const createProjectSX = {
  borderStyle: "dashed",
  borderColor: "#fff",
  borderRadius: 4,
  color: "#fff",
  minHeight: "110px",
  minWidth: "298px",
  textTransform: "unset",
  display: "flex",
  justifyContent: "space-evenly",
  "&:hover": {
    borderStyle: "dashed",
    borderColor: "#fff",
    backgroundColor: "#535353",
  },
};

const ProjectsListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateProject = () => {
    dispatch(setProjectName("Proyecto sin nombre"));
    dispatch(setProjectFolderAlreadyCreated(false));
    navigate("/import-images");
  };

  const localProjectsListMutation = useMutation(() => {
    return http.get(`/python-api/projects`);
  });

  const [localProjectsList, setLocalProjectList] = useState([]);

  useEffect(() => {
    localProjectsListMutation.mutate(
      {},
      {
        onSuccess: (res) => {
          setLocalProjectList(res.projects);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
    dispatch(clearState());
  }, []);

  const cloudProjectsList = [
    {
      name: "Proyecto sin nombre 5",
      date: 628021800,
      orthophoto_path:
        "/Users/braianb/PycharmProjects/image-processing/algo_13082022170009/rgb/odm_orthophoto/odm_orthophoto.png",
    },
    {
      name: "Proyecto sin nombre 6",
      date: 628021800,
      orthophoto_path:
        "/Users/braianb/PycharmProjects/image-processing/algo_13082022170009/rgb/odm_orthophoto/odm_orthophoto.png",
    },
    {
      name: "Proyecto sin nombre 5",
      date: 628021800,
      orthophoto_path:
        "/Users/braianb/PycharmProjects/image-processing/algo_13082022170009/rgb/odm_orthophoto/odm_orthophoto.png",
    },
  ];

  const onProjectItemClick = (project) => {
    dispatch(setProjectName(project.name));
    dispatch(setProjectPath(project.path));
    dispatch(
      setStitchingData({
        orthophoto_path: project.orthophoto_path,
        centerCoords: [
          project.avg_coordinates.avg_rgb_lat,
          project.avg_coordinates.avg_rgb_long,
        ],
        imageCoords: project.avg_coordinates.rgb_points,
      })
    );
    dispatch(setGeneratedIndexes(project.indexes));
    dispatch(setProcessingState(processingStates.INDEX_VISUALIZATION_HEATMAP));
    dispatch(setProjectFolderAlreadyCreated(true));
    navigate("/processing");
  };

  const ProjectListItem = ({ project }) => {
    return (
      <Card
        sx={{
          bgcolor: "#7B7B7B",
          borderRadius: 4,
          height: "110px",
          width: "298px",
        }}
        elevation={4}
        onClick={() => onProjectItemClick(project)}
      >
        <CardActionArea sx={{ display: "flex" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Stack
              direction={"column"}
              alignItems={"space-between"}
              sx={{ width: "100%" }}
            >
              <Typography component="div" variant="body1">
                {project.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {moment(project.date * 1000).format("L")}
              </Typography>
            </Stack>
          </CardContent>
          {project.orthophoto_path ? (
            <CardMedia
              sx={{
                height: "110px",
                width: "35%",
                backgroundSize: "contain",
                bgcolor: "#AEAEAE",
              }}
              component="img"
              image={"file://" + project.orthophoto_thumb_path}
            />
          ) : (
            <Box
              sx={{
                height: "110px",
                width: "35%",
                backgroundSize: "contain",
                bgcolor: "#AEAEAE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhotoSizeSelectActualOutlinedIcon />
            </Box>
          )}
        </CardActionArea>
      </Card>
    );
  };

  return (
    <Stack>
      <Toolbar />
      <Stack m={5}>
        <Typography>Proyectos Locales</Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          mt={2}
          flexWrap={"wrap"}
          gap={"45px"}
        >
          <Button
            variant={"outlined"}
            sx={createProjectSX}
            onClick={handleCreateProject}
          >
            <Typography ml={2}>Crear Proyecto</Typography>
            <AddIcon />
          </Button>
          {localProjectsList.map((project) => (
            <ProjectListItem project={project} />
          ))}
        </Stack>
      </Stack>
      <Stack m={5}>
        <Stack flexDirection={"row"}>
          <Typography>Proyectos en la Nube</Typography>
          <Button variant={"outlined"} sx={{ml: "auto", textTransform: "unset"}}>
              <Typography mr={2}>Actualizar lista</Typography>
              <CachedIcon />
          </Button>
        </Stack>
        {cloudProjectsList.length > 0 ? (
          <Stack
            direction={"row"}
            alignItems={"center"}
            mt={2}
            flexWrap={"wrap"}
            gap={"45px"}
          >
            {cloudProjectsList.map((project) => (
              <ProjectListItem project={project} />
            ))}
          </Stack>
        ) : (
          <Typography mt={2} variant={"body1"}>
            No hay proyectos para mostrar
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default ProjectsListScreen;
