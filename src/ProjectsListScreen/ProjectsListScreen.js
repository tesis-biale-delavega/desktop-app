import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia, CircularProgress, Divider,
  Link,
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
import "moment/locale/es";
import { toast } from "react-toastify";

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
  const [downloadCloudProjectIsLoading, setDownloadCloudProjectIsLoading] = useState(false);

  const cloudProjectsListMutation = useMutation(() => {
    return http.get(`/spring-api/api/project`);
  });

  const getLocalProjects = () => {
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
  };

  const getCloudProjects = () => {
    cloudProjectsListMutation.mutate(
      {},
      {
        onSuccess: (res) => {
          setCloudProjectList(res);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  useEffect(() => {
    getLocalProjects();
    getCloudProjects();
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

  const downloadCloudProjectMutation = useMutation((body) => {
    return http.post(`/python-api/download-dip`, body);
  });

  const onDownloadCloudProjectPress = (project) => {
    const body = { projectUrl: project.projectUrl, fileName: project.fileName };
    setDownloadCloudProjectIsLoading(true);
    downloadCloudProjectMutation.mutate(body, {
      onSuccess: () => {
        setDownloadCloudProjectIsLoading(false);
        toast.success("Proyecto descargado exitosamente!");
        getLocalProjects();
      },
      onError: (err) => {
        setDownloadCloudProjectIsLoading(false);
        toast.error(err);
      },
    });
  };

  const ProjectListItem = ({
    project,
    showImage,
    disableProjectInfoRedirect,
  }) => {
    return (
      <Card
        sx={{
          bgcolor: "#7B7B7B",
          borderRadius: 4,
          height: "110px",
          width: "298px",
        }}
        elevation={4}
        onClick={() =>
          !disableProjectInfoRedirect && onProjectItemClick(project)
        }
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
                {moment(
                  project.creationDate
                    ? project.creationDate
                    : project.date * 1000
                ).locale("es").format("L")}
              </Typography>
              {project.projectUrl && (
                <Link
                  color={"#49BB58"}
                  onClick={() => onDownloadCloudProjectPress(project)}
                >
                  Descargar proyecto
                </Link>
              )}
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
      <Stack>
        <Typography bgcolor={"#136536"} p={3} variant={"h6"}>Proyectos Locales</Typography>
        <Divider color={"#fff"} />
        <Stack
          direction={"row"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={"45px"}
          m={5}
        >
          <Button
            variant={"outlined"}
            sx={createProjectSX}
            onClick={handleCreateProject}
          >
            <Typography ml={2}>Crear Proyecto</Typography>
            <AddIcon />
          </Button>
          {localProjectsList
            .filter((projectData) => projectData.avg_coordinates !== null)
            .map((project) => (
              <ProjectListItem project={project} showImage />
            ))}
        </Stack>
      </Stack>
      <Stack>
        <Stack flexDirection={"row"} bgcolor={"#136536"} alignItems={"center"}>
          <Typography p={3} variant={"h6"}>Proyectos en la Nube</Typography>
          <Button
            variant={"contained"}
            sx={{ ml: "auto", mr: 2, textTransform: "unset" }}
            onClick={getCloudProjects}
          >
            <Typography mr={2}>Actualizar lista</Typography>
            <CachedIcon />
          </Button>
        </Stack>
        <Divider color={"#fff"} />
        {cloudProjectsList.length > 0 ? (
          <Stack
            direction={"row"}
            alignItems={"center"}
            flexWrap={"wrap"}
            gap={"45px"}
            m={5}
          >
            {cloudProjectsList.map((project) => (
              <ProjectListItem project={project} disableProjectInfoRedirect />
            ))}
          </Stack>
        ) : (
          <Typography m={5} variant={"body1"}>
            Aún no se ha subido ningún proyecto a la nube
          </Typography>
        )}
      </Stack>
      {downloadCloudProjectIsLoading &&
        <CircularProgress
          sx={{ color: "#fff", position: "fixed", right: 40, top: 90 }}
        />
      }
    </Stack>
  );
};

export default ProjectsListScreen;
