import {
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
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import {
  setProjectFolderAlreadyCreated,
  setProjectName,
} from "../analysis/analysisSlice";

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

  const localProjectsList = [
    {
      name: "Proyecto sin nombre 1",
      date: 628021800000,
      orthophoto_path:
        "/Users/braianb/PycharmProjects/image-processing/algo_13082022170009/rgb/odm_orthophoto/odm_orthophoto.png",
    },
    {
      name: "Proyecto sin nombre 2",
      date: 628021800000,
      orthophoto_path:
        "/Users/braianb/PycharmProjects/image-processing/algo_13082022170009/rgb/odm_orthophoto/odm_orthophoto.png",
    },
    {
      name: "Proyecto sin nombre 3",
      date: 628021800000,
      orthophoto_path:
        "/Users/braianb/PycharmProjects/image-processing/algo_13082022170009/rgb/odm_orthophoto/odm_orthophoto.png",
    },
    {
      name: "Proyecto sin nombre 4",
      date: 628021800000,
      orthophoto_path:
        "/Users/braianb/PycharmProjects/image-processing/algo_13082022170009/rgb/odm_orthophoto/odm_orthophoto.png",
    },
  ];

  const cloudProjectsList = [
    {
      name: "Proyecto sin nombre 5",
      date: 628021800000,
      orthophoto_path:
        "/Users/braianb/PycharmProjects/image-processing/algo_13082022170009/rgb/odm_orthophoto/odm_orthophoto.png",
    },
    {
      name: "Proyecto sin nombre 6",
      date: 628021800000,
      orthophoto_path:
        "/Users/braianb/PycharmProjects/image-processing/algo_13082022170009/rgb/odm_orthophoto/odm_orthophoto.png",
    },
    {
      name: "Proyecto sin nombre 5",
      date: 628021800000,
      orthophoto_path:
          "/Users/braianb/PycharmProjects/image-processing/algo_13082022170009/rgb/odm_orthophoto/odm_orthophoto.png",
    },
  ];

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
                {new Date(project.date).toLocaleDateString()}
              </Typography>
            </Stack>
          </CardContent>
          <CardMedia
            sx={{
              height: "110px",
              width: "35%",
              backgroundSize: "contain",
              bgcolor: "#AEAEAE",
            }}
            image={"file://" + project.orthophoto_path}
          />
        </CardActionArea>
      </Card>
    );
  };

  return (
    <Stack >
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
        <Typography>Proyectos en la Nube</Typography>
        {cloudProjectsList.length > 0 ?
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
          </Stack> : <Typography mt={2} variant={"body1"}>No hay proyectos para mostrar</Typography>
        }
      </Stack>
    </Stack>
  );
};

export default ProjectsListScreen;
