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
import 'moment/locale/es'

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
  const [cloudProjectsList, setCloudProjectList] = useState([]);

  const cloudProjectsListMutation = useMutation(() => {
    return http.get(`/spring-api/api/project`);
  });

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
    cloudProjectsListMutation.mutate({},
        {
          onSuccess: (res) => {
            const projectList = res.map(projectData => ({date: projectData.creationDate}))
            setCloudProjectList(res);
          },
          onError: (error) => {
            console.log(error);
          },
        })
    dispatch(clearState());
  }, []);

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

  const ProjectListItem = ({ project, showImage }) => {
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
        <CardActionArea sx={{ display: "flex", flexGrow: 1, height: "100%" }}>
          <CardContent sx={{ display: "flex", flexGrow: 1 }}>
            <Stack
              direction={"column"}
              alignItems={"space-between"}
              sx={{ width: "100%", height: "100%" }}
            >
              <Typography component="div" variant="body1">
                {project.name ? project.name : "Proyecto sin nombre"}
              </Typography>
              <Typography variant="subtitle1" color="#c6c6c6" component="div">
                {moment(project.creationDate ? project.creationDate : project.date * 1000).locale('es').format("L")}
              </Typography>
            </Stack>
          </CardContent>
          {showImage &&
            (project.orthophoto_path ? (
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
            ))}
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
          {localProjectsList.filter(projectData => projectData.avg_coordinates !== null).map((project) => (
            <ProjectListItem project={project} showImage />
          ))}
        </Stack>
      </Stack>
      <Stack m={5}>
        <Stack flexDirection={"row"}>
          <Typography>Proyectos en la Nube</Typography>
          <Button
            variant={"outlined"}
            sx={{ ml: "auto", textTransform: "unset" }}
          >
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
