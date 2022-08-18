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
  marginTop: 2,
  borderStyle: "dashed",
  borderColor: "#fff",
  width: "16%",
  color: "#fff",
  textTransform: "unset",
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
    dispatch(setProjectName("Project unnamed"));
    dispatch(setProjectFolderAlreadyCreated(false));
    navigate("/import-images");
  };

  const list = [
    {
      name: "Project unnamed 1",
      date: 628021800000,
      orthophoto_path:
        "/Users/braianb/PycharmProjects/image-processing/algo_13082022170009/rgb/odm_orthophoto/odm_orthophoto.png",
    },
  ];

  return (
    <Stack sx={{ backgroundColor: "#535353", height: "100%" }}>
      <Toolbar />
      <Stack m={10}>
        <Typography>Local Projects</Typography>
        <Stack direction={"row"}>
          <Button
            variant={"outlined"}
            sx={createProjectSX}
            onClick={handleCreateProject}
          >
            <AddIcon />
            <Typography ml={2}>Create Project</Typography>
          </Button>
          {list.map((project) => (
            <Card sx={{ml: 2 }}>
              <CardActionArea sx={{display: "flex"}}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {project.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {new Date(project.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardMedia
                  sx={{
                    height: 110,
                    width: 115,
                    backgroundSize: "contain",
                    bgcolor: "#AEAEAE",
                  }}
                  image={"file://" + project.orthophoto_path}
                />
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Stack>
      <Stack m={10}>
        <Typography>Cloud Projects</Typography>
      </Stack>
    </Stack>
  );
};

export default ProjectsListScreen;
