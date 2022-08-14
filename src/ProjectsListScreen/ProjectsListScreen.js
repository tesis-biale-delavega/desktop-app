import { Button, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

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
        backgroundColor: "#535353"
    }
}

const ProjectsListScreen = () => {
  const navigate = useNavigate();

  const handleCreateProject = () => {
      navigate("/processing")
  }

  return (
    <Stack sx={{ backgroundColor: "#535353", height: "100%" }}>
      <Toolbar />
      <Stack m={10}>
        <Typography>Local Projects</Typography>
        <Button
          variant={"outlined"}
          sx={createProjectSX}
          onClick={handleCreateProject}
        >
          <AddIcon />
          <Typography ml={2}>Create Project</Typography>
        </Button>
      </Stack>
      <Stack m={10}>
        <Typography>Cloud Projects</Typography>
      </Stack>
    </Stack>
  );
};

export default ProjectsListScreen;
